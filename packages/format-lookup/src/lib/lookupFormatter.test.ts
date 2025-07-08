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
import { loc } from '@localizer/core';

import {
  UndefinedValue,
  lookupFormatter,
  NullValue,
  NoValue,
  DefaultValue,
} from './lookupFormatter.js';

describe('lookUpFormatter', () => {
  it('returns the correct formatter for a matching value', () => {
    const formatter = lookupFormatter<number>({
      1: loc`One`,
      2: loc`Two`,
    });
    const result = formatter(1).localize('en-US');
    expect(result).toBe('One');
  });

  it('returns the formatter for UndefinedValue when value is undefined', () => {
    const formatter = lookupFormatter({
      [UndefinedValue]: loc`Undefined`,
    });
    const result = formatter(undefined).localize('en-US');
    expect(result).toBe('Undefined');
  });

  it('returns the formatter for NullValue when value is null', () => {
    const formatter = lookupFormatter({
      [NullValue]: loc`Null`,
    });
    const result = formatter(null).localize('en-US');
    expect(result).toBe('Null');
  });

  it('returns the formatter for NoValue when value is undefined or null', () => {
    const formatter = lookupFormatter({
      [NoValue]: loc`No Value`,
    });
    const resultUndefined = formatter(undefined).localize('en-US');
    const resultNull = formatter(null).localize('en-US');
    expect(resultUndefined).toBe('No Value');
    expect(resultNull).toBe('No Value');
  });

  it('returns the default formatter when no specific match is found', () => {
    const formatter = lookupFormatter({
      [DefaultValue]: loc`Default`,
    });
    const result = formatter(3).localize('en-US');
    expect(result).toBe('Default');
  });

  it('throws an error when no match or default formatter is found', () => {
    const formatter = lookupFormatter<number>({
      1: loc`One`,
    });
    expect(() => formatter(2).localize('en-US')).toThrowError(
      'Value 2 is not represented in [1], but no default value is specified',
    );
  });

  it('applies a value formatter function when provided', () => {
    const formatter = lookupFormatter<number>({
      1: (value: number) => loc`Value is ${loc(() => '' + value)}`,
    });
    const result = formatter(1).localize('en-US');
    expect(result).toBe('Value is 1');
  });
});
