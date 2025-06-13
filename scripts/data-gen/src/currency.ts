import { Listr } from 'listr2';
import { writeFile } from 'node:fs/promises';
import { fetch } from 'undici';
import { read, utils } from 'xlsx';

//----------------------------------------------------------------------------------------------------------------------
// Fetches currency information from SIX Group and generates a `currency.ts` file
//
// Actual currencies, fund and precious metals are fetched from:
//  -  https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xls
//
// Historical currencies, fund and precious metals are fetched from:
//  -  https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-three.xls
//----------------------------------------------------------------------------------------------------------------------

type Context = {
  actual: string[];
  historical: string[];
};

export const currencyTasks = new Listr<Context>([
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
]) as Listr;

//----------------------------------------------------------------------------------------------------------------------
/**
 * Fetches and parses currency data from a given URL and sheet name.
 *
 * @param url - The URL to fetch the Excel file from.
 * @param sheet - The name of the sheet to parse from the Excel file.
 * @return A promise that resolves to an array of unique currency codes sorted alphabetically.
 * @internal
 */
async function fetchAndParseData(url: string, sheet: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch SIX Group data from ${url}: ${response.statusText}`,
    );
  }

  const excelData = read(Buffer.from(await response.arrayBuffer()));
  const data: Record<string, string>[] = utils.sheet_to_json(
    excelData.Sheets[sheet],
    { range: 3 },
  );

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
async function fetchActualCodes(ctx: Context) {
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
async function fetchHistoricalCodes(ctx: Context) {
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
async function writeCurrencyTs(ctx: Context) {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/format-number/src/lib/currency.ts`;

  const content = `/* THIS FILE IS AUTO-GENERATED USING "tools/data-gen". DO NOT EDIT! */
  
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
