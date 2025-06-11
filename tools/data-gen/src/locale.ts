import { Listr } from 'listr2';
import { writeFile } from 'node:fs/promises';
import { fetch } from 'undici';
import { parse } from 'yaml';

//----------------------------------------------------------------------------------------------------------------------
// Fetches country and language information from Nominatim and generates a `locale.ts` file
//
// Language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
// Countries and primary language:
//   - https://github.com/osm-search/Nominatim/blob/v4.1.0/settings/country_settings.yaml
//   - https://github.com/osm-search/Nominatim/blob/master/settings/country_settings.yaml
//   - https://raw.githubusercontent.com/osm-search/Nominatim/refs/tags/v4.1.0/settings/country_settings.yaml
//----------------------------------------------------------------------------------------------------------------------

type Context = {
  countrySettings: Record<string, Record<string, string>>;
  countries: string[];
  languages: string[];
  primaryLocales: Record<string, string>;
};

export const localeTasks = new Listr<Context>([
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
]) as Listr;

//----------------------------------------------------------------------------------------------------------------------
/**
 * Fetches and parses Nominatim country settings from the provided URL.
 * @param url - The URL to fetch the Nominatim data from.
 * @returns A promise that resolves to the parsed Nominatim data.
 * @internal
 */
async function fetchAndParseNominatimData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Nominatim data from ${url}: ${response.statusText}`
    );
  }

  return parse(
    (await response.text()).split('!include').join('ignore include')
  );
}

/**
 * Fetches Nominatim country settings and stores them in the context.
 * @param ctx - The context object to store the fetched data.
 * @internal
 */
async function fetchNominatimData(ctx: Context) {
  ctx.countrySettings = {
    ...(await fetchAndParseNominatimData(
      'https://raw.githubusercontent.com/osm-search/Nominatim/refs/tags/v4.1.0/settings/country_settings.yaml'
    )),
    ...(await fetchAndParseNominatimData(
      'https://raw.githubusercontent.com/osm-search/Nominatim/refs/heads/master/settings/country_settings.yaml'
    )),
  };
}

/**
 * Fetches the IANA language registry and populates the context with language codes.
 * @param ctx - The context object to store the fetched languages.
 * @internal
 */
async function fetchIanaLanguageRegistry(ctx: Context) {
  const response = await fetch(
    'https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry'
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch IANA language registry: ${response.statusText}`
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
function convertNominatimData(ctx: Context) {
  ctx.countries = Object.keys(ctx.countrySettings).map((it) =>
    it.toUpperCase()
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
async function writeLocaleTs(ctx: Context) {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/core/src/lib/consts/locale.ts`;

  const content = `/* THIS FILE IS AUTO-GENERATED USING "tools/data-gen". DO NOT EDIT! */
  
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
