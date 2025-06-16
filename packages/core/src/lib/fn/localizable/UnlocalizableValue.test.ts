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
import { UnlocalizableValue } from './UnlocalizableValue.js';

describe('Unlocalizable', () => {
  it('returns the value when localize is called', () => {
    const result = new UnlocalizableValue('test value');
    expect(result.localize()).toBe('test value');
  });

  it('returns the value when toLocaleString is called', () => {
    const result = new UnlocalizableValue('test value');
    expect(result.toLocaleString()).toBe('test value');
  });

  it('handles non-string values correctly', () => {
    const result = new UnlocalizableValue(123);
    expect(result.localize()).toBe(123);
  });

  it('uses Symbol.toPrimitive to return the primitive value', () => {
    expect(`${new UnlocalizableValue('primitive value')}`).toBe(
      'primitive value',
    );
    expect(`${new UnlocalizableValue(12n)}`).toBe('12');
    expect(`${new UnlocalizableValue(12)}`).toBe('12');
    expect(`${new UnlocalizableValue(false)}`).toBe('false');
    expect(`${new UnlocalizableValue(undefined)}`).toBe('undefined');
    expect(`${new UnlocalizableValue(null)}`).toBe('null');
    expect(`${new UnlocalizableValue(Symbol('test'))}`).toBe('[object Symbol]');
    expect(`${new UnlocalizableValue({})}`).toBe('[object Object]');
    expect(`${new UnlocalizableValue([])}`).toBe('[object Array]');
    expect(`${new UnlocalizableValue(() => void 0)}`).toBe('[object Function]');
  });

  it('creates an instance of Localizable', () => {
    const result = new UnlocalizableValue('value');
    expect(result).toHaveProperty('localize');
    expect(typeof result.localize).toBe('function');
  });

  it('handles null values gracefully', () => {
    const result = new UnlocalizableValue(null);
    expect(result.localize()).toBe(null);
  });

  it('handles undefined values gracefully', () => {
    const result = new UnlocalizableValue(undefined);
    expect(result.localize()).toBe(undefined);
  });
});
