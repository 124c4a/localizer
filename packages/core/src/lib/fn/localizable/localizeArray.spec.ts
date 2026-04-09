/*
 * Copyright 2026 Artem Godin.
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
import { localizeArray } from './localizeArray.js';

describe('localizeArray', () => {
  it('returns localized values for an array of localizable objects', () => {
    const values = [
      { localize: (locale: string) => `value1 for ${locale}` },
      { localize: (locale: string) => `value2 for ${locale}` },
    ];
    expect(localizeArray(values, 'en-US')).toEqual(['value1 for en-US', 'value2 for en-US']);
  });

  it('returns original values for non-localizable objects', () => {
    const values = [42, 'string', true];
    expect(localizeArray(values, 'en-US')).toEqual([42, 'string', true]);
  });

  it('handles mixed arrays of localizable and non-localizable objects', () => {
    const values = [{ localize: (locale: string) => `value1 for ${locale}` }, 42, 'string'];
    expect(localizeArray(values, 'en-US')).toEqual(['value1 for en-US', 42, 'string']);
  });

  it('returns an empty array when input is an empty array', () => {
    expect(localizeArray([], 'en-US')).toEqual([]);
  });

  it('handles null values in the array gracefully', () => {
    const values = [null, { localize: (locale: string) => `value for ${locale}` }];
    expect(localizeArray(values, 'en-US')).toEqual([null, 'value for en-US']);
  });

  it('handles undefined values in the array gracefully', () => {
    const values = [undefined, { localize: (locale: string) => `value for ${locale}` }];
    expect(localizeArray(values, 'en-US')).toEqual([undefined, 'value for en-US']);
  });

  it('throws an error if the input is not an array', () => {
    expect(() => localizeArray({} as unknown as [], 'en-US')).toThrow(
      new TypeError('Expected an array of values to localize, got object'),
    );
  });
});
