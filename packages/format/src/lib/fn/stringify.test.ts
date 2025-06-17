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
import { stringify } from './stringify.js';

describe('stringify', () => {
  it('returns a Localizable object that converts a value to a string for a valid locale', () => {
    const result = stringify(123).localize('en-US');
    expect(result).toBe('123');
  });

  it('returns a placeholder string for undefined locale', () => {
    const result = stringify(123).localize(null);
    expect(result).toBe('[stringify]');
  });

  it('handles null values correctly', () => {
    const result = stringify(null).localize('en-US');
    expect(result).toBe('null');
  });

  it('handles undefined values correctly', () => {
    const result = stringify(undefined).localize('en-US');
    expect(result).toBe('undefined');
  });

  it('handles object values by converting them to string', () => {
    const result = stringify({ key: 'value' }).localize('en-US');
    expect(result).toBe('[object Object]');
  });

  it('handles array values by converting them to string', () => {
    const result = stringify([1, 2, 3]).localize('en-US');
    expect(result).toBe('1,2,3');
  });

  it('handles boolean values correctly', () => {
    const result = stringify(true).localize('en-US');
    expect(result).toBe('true');
  });

  it('handles symbol values correctly', () => {
    const result = stringify(Symbol('test')).localize('en-US');
    expect(result).toBe('Symbol(test)');
  });
});
