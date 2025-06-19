/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Listr } from 'listr2';
import { writeFile } from 'node:fs/promises';
import { fetch } from 'undici';
import { read, utils } from 'xlsx';
import { parse } from 'yaml';

/**
 * Main entry point for the data generation tool.
 */
const tasks = new Listr(
  [
    {
      title: 'Generating locales',
      task: () => localeTasks,
    },
    {
      title: 'Generating currencies',
      task: () => currencyTasks,
    },
    {
      title: 'Generating units',
      task: writeUnitTs,
    },
  ],
  { concurrent: true },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });

//===

//----------------------------------------------------------------------------------------------------------------------
// Fetches country and language information from Nominatim and generates a `locale.ts` file
//
// Language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
// Countries and primary language:
//   - https://github.com/osm-search/Nominatim/blob/v4.1.0/settings/country_settings.yaml
//   - https://github.com/osm-search/Nominatim/blob/master/settings/country_settings.yaml
//   - https://raw.githubusercontent.com/osm-search/Nominatim/refs/tags/v4.1.0/settings/country_settings.yaml
//----------------------------------------------------------------------------------------------------------------------

export const localeTasks = new Listr([
  {
    title: 'Fetching Nominatim country settings',
    task: fetchNominatimData,
  },
  {
    title: 'Fetching IANA language registry',
    task: fetchIanaLanguageRegistry,
  },
  {
    title: 'Convert Nominatim country settings to country and language codes',
    task: convertNominatimData,
  },
  {
    title: 'Writing locale.ts',
    task: writeLocaleTs,
  },
]);

//----------------------------------------------------------------------------------------------------------------------
/**
 * Fetches and parses Nominatim country settings from the provided URL.
 * @param url - The URL to fetch the Nominatim data from.
 * @returns A promise that resolves to the parsed Nominatim data.
 * @internal
 */
async function fetchAndParseNominatimData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Nominatim data from ${url}: ${response.statusText}`,
    );
  }

  return parse(
    (await response.text()).split('!include').join('ignore include'),
  );
}

/**
 * Fetches Nominatim country settings and stores them in the context.
 * @param ctx - The context object to store the fetched data.
 * @internal
 */
async function fetchNominatimData(ctx) {
  ctx.countrySettings = {
    ...(await fetchAndParseNominatimData(
      'https://raw.githubusercontent.com/osm-search/Nominatim/refs/tags/v4.1.0/settings/country_settings.yaml',
    )),
    ...(await fetchAndParseNominatimData(
      'https://raw.githubusercontent.com/osm-search/Nominatim/refs/heads/master/settings/country_settings.yaml',
    )),
  };
}

/**
 * Fetches the IANA language registry and populates the context with language codes.
 * @param ctx - The context object to store the fetched languages.
 * @internal
 */
async function fetchIanaLanguageRegistry(ctx) {
  const response = await fetch(
    'https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch IANA language registry: ${response.statusText}`,
    );
  }

  const blocks = (await response.text()).split('%%');
  ctx.languages = [];

  blocks
    .map((it) => it.trim())
    .forEach((it) => {
      if (it.startsWith('Type: language')) {
        const lines = it.split('\n');
        const subtagLine = lines.find((line) => line.startsWith('Subtag:'));
        if (subtagLine) {
          const subtag = subtagLine.split(':')[1].trim();
          if (subtag.length === 2) {
            // Only add 2-letter language codes
            ctx.languages.push(subtag);
          }
        }
      }
    });
}

/**
 * Converts Nominatim country settings into a structured format for languages and primary locales.
 * @param ctx - The context object containing country settings and to be populated with languages and primary locales.
 * @internal
 */
function convertNominatimData(ctx) {
  ctx.countries = Object.keys(ctx.countrySettings).map((it) =>
    it.toUpperCase(),
  );
  ctx.primaryLocales = {};

  ctx.countries.forEach((country) => {
    const countryData = ctx.countrySettings[country.toLowerCase()];
    const countryLanguages = (countryData.languages || '')
      .split(',')
      .map((it) => it.trim());
    if (countryLanguages.length > 0) {
      countryLanguages
        .filter((it) => it.length === 2)
        .forEach((it) => {
          if (!ctx.languages.includes(it)) {
            ctx.languages.push(it);
          }
        });
      const primaryLanguage = countryLanguages
        .map((it) => it.split('-')[0])
        .filter((it) => it.length === 2);
      if (primaryLanguage.length > 0) {
        ctx.primaryLocales[country] = primaryLanguage[0];
      }
    }
  });

  ctx.languages = Array.from(new Set(ctx.languages));
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

/**
 * Writes the locale TypeScript file based on the context data.
 * @param ctx - The context object containing languages, countries, and primary locales.
 * @internal
 */
async function writeLocaleTs(ctx) {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/core/src/lib/consts/locale.ts`;

  const content = `/* THIS FILE IS AUTO-GENERATED USING "scripts/generate-enums.js". DO NOT EDIT! */
  
/**
 * IETF BCP 47 language tag
 * 
 * @see https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 *
 * @public
 */

export type LanguageCode =
${ctx.languages
  .map((it) => `  /** ${languageNames.of(it)} */\n  | '${it}'`)
  .join('\n')};

/**
 * ISO 3166-1 alpha-2 country codes
 *
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 * @public
 */
export type CountryCode =
${ctx.countries
  .map((it) => `  /** ${regionNames.of(it)} */\n  | '${it}'`)
  .join('\n')};

/**
 * Supported locale codes
 *
 * @public
 */
export type LocaleCode = LanguageCode | \`\${LanguageCode}-\${CountryCode}\`;

/**  
 * Primary locales for each country
 *
 * @see https://github.com/osm-search/Nominatim/blob/master/settings/country_settings.yaml
 *
 * @internal
  */
export const primaryLocales: Record<CountryCode, LocaleCode> = {
${Object.entries(ctx.primaryLocales)
  .map(([country, locale]) => `  '${country}': '${locale}-${country}',`)
  .join('\n')}
} as const;
`;

  await writeFile(targetFile, content);
}

//---

export const currencyTasks = new Listr([
  {
    title: 'Fetching actual currency codes',
    task: fetchActualCodes,
  },
  {
    title: 'Fetching historical currency codes',
    task: fetchHistoricalCodes,
  },
  {
    title: 'Writing currency.ts',
    task: writeCurrencyTs,
  },
]);

//----------------------------------------------------------------------------------------------------------------------
/**
 * Fetches and parses currency data from a given URL and sheet name.
 *
 * @param url - The URL to fetch the Excel file from.
 * @param sheet - The name of the sheet to parse from the Excel file.
 * @return A promise that resolves to an array of unique currency codes sorted alphabetically.
 * @internal
 */
async function fetchAndParseData(url, sheet) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch SIX Group data from ${url}: ${response.statusText}`,
    );
  }

  const excelData = read(Buffer.from(await response.arrayBuffer()));
  const data = utils.sheet_to_json(excelData.Sheets[sheet], { range: 3 });

  if (data.length === 0 || !data[0]['Alphabetic Code']) {
    throw new Error(`No valid data found in the sheet '${sheet}' from ${url}`);
  }

  return Array.from(
    new Set(
      data.map((it) => it['Alphabetic Code']).filter((it) => it !== undefined),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

/**
 * Fetches the actual currency codes from the SIX Group data center.
 * @param ctx - The context object to store the fetched data.
 * @internal
 */
async function fetchActualCodes(ctx) {
  ctx.actual = await fetchAndParseData(
    'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xls',
    'Active',
  );
}

/**
 * Fetches the historical currency codes from the SIX Group data center.
 * @param ctx - The context object to store the fetched data.
 * @internal
 */
async function fetchHistoricalCodes(ctx) {
  ctx.historical = await fetchAndParseData(
    'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-three.xls',
    'Historic',
  );
}

/**
 * Writes the currency types to a TypeScript file.
 * @param ctx - The context object containing the actual and historical currency codes.
 * @internal
 */
async function writeCurrencyTs(ctx) {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/format-number/src/lib/currency.ts`;

  const content = `/* THIS FILE IS AUTO-GENERATED USING "scripts/generate-enums.js". DO NOT EDIT! */

/**
 * ISO 4217 currency, fund and precious metal codes
 *
 * @see https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)
 *
 * @public
 */

export type ActiveCurrencyCode =
${ctx.actual.map((it) => `  | '${it}'`).join('\n')};

/**
 * ISO 4217 codes for historic denominations of currencies and funds 
 *
 * @see https://en.wikipedia.org/wiki/ISO_4217#Historical_codes
 *
 * @public
 */
export type HistoricCurrencyCode =
${ctx.historical.map((it) => `  | '${it}'`).join('\n')};

/**
 * Supported currency codes, including both actual and historical
 *
 * @public
 */
export type CurrencyCode = ActiveCurrencyCode | HistoricCurrencyCode;
`;

  await writeFile(targetFile, content);
}

//---

/**
 * Generates the `unit.ts` file containing the supported units for unit formatting.
 * The generated file exports types for singular units and a union type for all supported units.
 * @returns A promise that resolves when the file has been written.
 * @internal
 */
async function writeUnitTs() {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/format-number/src/lib/unit.ts`;

  const units = Intl.supportedValuesOf('unit');

  const content = `/* THIS FILE IS AUTO-GENERATED USING "scripts/generate-enums.js". DO NOT EDIT! */
  
/**
 * A subset of the CLDR units explicitly sanctioned by the ECMA-402 specification
 * 
 * @see https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
 *
 * @public
 */

export type SingularUnit =
${units.map((it) => `  | '${it}'`).join('\n')};

/**
 * Supported units for unit formatting
 *
 * @public
 */
export type Unit = SingularUnit | \`\${SingularUnit}-per-\${SingularUnit}\`;
`;

  await writeFile(targetFile, content);
}
