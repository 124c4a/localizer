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
import { autoFormat } from './autoFormat.js';

describe('autoFormat', () => {
  it('formats booleans correctly as strings', () => {
    const result = autoFormat(true);
    expect(result.localize('en-US')).toBe('true');
  });

  it('formats numbers correctly as decimals', () => {
    const result = autoFormat(123456);
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats bigints correctly as decimals', () => {
    const result = autoFormat(BigInt(123456));
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats Number objects correctly as decimals', () => {
    // eslint-disable-next-line sonarjs/no-primitive-wrappers
    const result = autoFormat(new Number(123456));
    expect(result.localize('en-US')).toBe('123,456');
  });

  it('formats Date objects correctly as dates', () => {
    const result = autoFormat(new Date('2023-01-01'));
    expect(result.localize('en-US')).toBe('1/1/2023');
  });

  it('formats arrays correctly as lists', () => {
    const result = autoFormat([1, 2, 3]);
    expect(result.localize('en-US')).toBe('1, 2, 3');
  });

  it('returns the value directly if it is already localizable', () => {
    const localizableValue = { localize: () => 'already localizable' };
    const result = autoFormat(localizableValue);
    expect(result.localize('en-US')).toBe('already localizable');
  });

  it('returns Empty for undefined values', () => {
    const result = autoFormat(undefined);
    expect(result.localize('en-US')).toBe('');
  });

  it('returns Empty for null values', () => {
    const result = autoFormat(null);
    expect(result.localize('en-US')).toBe('');
  });

  it('formats strings using stringify', () => {
    const result = autoFormat('test string');
    expect(result.localize('en-US')).toBe('test string');
  });

  it('formats other values using stringify', () => {
    const result = autoFormat({ key: 'value' });
    expect(result.localize('en-US')).toBe('[object Object]');
  });
});
