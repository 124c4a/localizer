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
import { _toPrimitiveValue } from './to-primitive-value.js';

describe('_toPrimitiveValue', () => {
  it('should return null when value is null', () => {
    expect(_toPrimitiveValue(null)).toBeNull();
  });

  it('should return undefined when value is undefined', () => {
    expect(_toPrimitiveValue(undefined)).toBeUndefined();
  });

  it('should return the same value for a bigint', () => {
    const value = BigInt(123);
    expect(_toPrimitiveValue(value)).toBe(value);
  });

  it('should return the same value for a boolean', () => {
    expect(_toPrimitiveValue(true)).toBe(true);
    expect(_toPrimitiveValue(false)).toBe(false);
  });

  it('should return the same value for a number', () => {
    expect(_toPrimitiveValue(42)).toBe(42);
    expect(_toPrimitiveValue(0)).toBe(0);
    expect(_toPrimitiveValue(-1)).toBe(-1);
  });

  it('should return the same value for a string', () => {
    expect(_toPrimitiveValue('hello')).toBe('hello');
    expect(_toPrimitiveValue('')).toBe('');
  });

  it('should return the string representation for objects', () => {
    expect(_toPrimitiveValue({})).toBe('[object Object]');
    expect(_toPrimitiveValue([])).toBe('[object Array]');
    expect(_toPrimitiveValue(() => ({}))).toBe('[object Function]');
  });

  it('should return the string representation for symbols', () => {
    const symbol = Symbol('test');
    expect(_toPrimitiveValue(symbol)).toBe('[object Symbol]');
  });
});
