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
import {
  stringify,
  decimal,
  decimalRange,
  relativeDecimal,
  percent,
  percentRange,
  relativePercent,
  currency,
  unit,
  date,
  time,
  dateTime,
  dateRange,
  dateTimeRange,
  currencySymbol,
  currencyName,
  languageName,
  countryName,
  and,
  or,
  list,
  relativeTime,
  autoFormat,
} from '@localizer/format';

const locales = ['en-US', 'fr-FR', 'de-DE', 'fi-FI', 'sv-FI', 'ko-KR', 'hi-IN'];

function withLabels(inputs: unknown[][] | unknown[]): unknown[][] {
  return inputs.map((input) => {
    if (!Array.isArray(input)) {
      return [JSON.stringify(input), input];
    } else {
      return [
        JSON.stringify(input)
          .replace(',', ',\u00a0')
          .replace('[', '')
          .replace(']', ''),
        ...input,
      ];
    }
  });
}

const past = new Date('2025-01-01');

export const demos = {
  date: (now: Date) => ({
    formatter: date,
    inputs: [['new Date()', now]],
    locales,
  }),
  time: (now: Date) => ({
    formatter: time,
    inputs: [['new Date()', now]],
    locales,
  }),
  dateTime: (now: Date) => ({
    formatter: dateTime,
    inputs: [['new Date()', now]],
    locales,
  }),
  dateRange: (now: Date) => ({
    formatter: dateRange,
    inputs: [[`new Date('2025-01-01'), new Date()`, past, now]],
    locales,
  }),
  dateTimeRange: (now: Date, then: Date) => ({
    formatter: dateTimeRange,
    inputs: [[`new Date('${then.toISOString()}'), new Date()`, then, now]],
    locales,
  }),
  relativeTime: (now: Date, then: Date) => ({
    formatter: relativeTime,
    inputs: [[`new Date('${then.toISOString()}'), new Date()`, then, now]],
    locales,
  }),
  currencySymbol: () => ({
    formatter: currencySymbol,
    inputs: withLabels(['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'SEK']),
    locales,
  }),
  currencyName: () => ({
    formatter: currencyName,
    inputs: withLabels(['USD', 'EUR', 'GBP', 'SEK']),
    locales,
  }),
  languageName: () => ({
    formatter: languageName,
    inputs: withLabels(['en', 'en-US', 'fi-FI', 'sv-FI']),
    locales,
  }),
  countryName: () => ({
    formatter: countryName,
    inputs: withLabels(['US', 'FI', 'SE', 'DE']),
    locales,
  }),
  and: () => ({
    formatter: and,
    inputs: [
      [
        `[ countryName('FI'), countryName('SE') ]`,
        [countryName('FI'), countryName('SE')],
      ],
      [
        `[ countryName('FI'), countryName('SE'), countryName('NO') ]`,
        [countryName('FI'), countryName('SE'), countryName('NO')],
      ],
    ],
    locales,
  }),
  or: () => ({
    formatter: or,
    inputs: [
      [
        `[ countryName('FI'), countryName('SE') ]`,
        [countryName('FI'), countryName('SE')],
      ],
      [
        `[ countryName('FI'), countryName('SE'), countryName('NO') ]`,
        [countryName('FI'), countryName('SE'), countryName('NO')],
      ],
    ],
    locales,
  }),
  list: () => ({
    formatter: list,
    inputs: [
      [
        `[ countryName('FI'), countryName('SE') ]`,
        [countryName('FI'), countryName('SE')],
      ],
      [
        `[ countryName('FI'), countryName('SE'), countryName('NO') ]`,
        [countryName('FI'), countryName('SE'), countryName('NO')],
      ],
    ],
    locales,
  }),
  decimal: () => ({
    formatter: decimal,
    inputs: withLabels([0, -1.2, 12.34, -123.456, 1234.5678, -12345.6789]),
    locales,
  }),
  decimalRange: () => ({
    formatter: decimalRange,
    inputs: withLabels([
      [5, 5],
      [-10, -10],
      [12, 34],
      [-567, 890],
      [10.1234, 1000.5678],
    ]),
    locales,
  }),
  percent: () => ({
    formatter: percent,
    inputs: withLabels([0, 0.0123, -0.09876, 0.1234, -0.9876, 1]),
    locales,
  }),
  percentRange: () => ({
    formatter: percentRange,
    inputs: withLabels([
      [0, 0],
      [-0.0123, 0.0123],
      [0.09876, 0.12345],
      [1, 2],
    ]),
    locales,
  }),
  currency: () => ({
    formatter: currency,
    inputs: withLabels([
      [0, 'USD'],
      [-1.2, 'EUR'],
      [1234.5678, 'GBP'],
      [-123456.789, 'INR'],
    ]),
    locales,
  }),
  unit: () => ({
    formatter: unit,
    inputs: withLabels([
      [10, 'fluid-ounce'],
      [120, 'kilometer-per-hour'],
      [640, 'kilobyte'],
      [0.5, 'liter'],
    ]),
    locales,
  }),
  relativeDecimal: () => ({
    formatter: relativeDecimal,
    inputs: withLabels([
      [5, 5],
      [20, 10],
      [100, 200],
      [1000.1234, 0],
      [0, 10000.56789],
    ]),
    locales,
  }),
  relativePercent: () => ({
    formatter: relativePercent,
    inputs: withLabels([
      [5, 5],
      [15, 10],
      [10, 15],
      [1000, 0],
      [-1000, 0],
      [-100, 1000],
    ]),
    locales,
  }),

  stringify: (now: Date) => ({
    formatter: stringify,
    inputs: [
      ['"Hello, world!"', 'Hello, world!'],
      ['undefined', undefined],
      ['null', null],
      ['true', true],
      ['42', 42],
      ['Math.PI', Math.PI],
      ['Infinity', Infinity],
      ['-Infinity', -Infinity],
      ['NaN', NaN],
      ['[1, 2, 3]', [1, 2, 3]],
      ['{ a: 1, b: 2 }', { a: 1, b: 2 }],
      ['/abc/', /abc/],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ['function() {}', function () {}],
      ['new Date()', now],
    ],
    locales: [],
  }),
  autoFormat: (now: Date) => ({
    formatter: autoFormat,
    inputs: [
      ['"Hello, world!"', 'Hello, world!'],
      ['undefined', undefined],
      ['null', null],
      ['true', true],
      ['42', 42],
      ['Math.PI', Math.PI],
      ['Infinity', Infinity],
      ['-Infinity', -Infinity],
      ['NaN', NaN],
      ['[1, 2, 3]', [1, 2, 3]],
      ['{ a: 1, b: 2 }', { a: 1, b: 2 }],
      ['/abc/', /abc/],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ['function() {}', function () {}],
      ['new Date()', now],
    ],
    locales: [],
  }),
};
