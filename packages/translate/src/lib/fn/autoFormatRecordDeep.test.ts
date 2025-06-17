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
import { autoFormatRecordDeep } from './autoFormatRecordDeep.js';

describe('autoFormatRecordDeep', () => {
  it('formats specified keys at the top level', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, ['key1']);
    expect(result).toEqual({
      key1: { localize: expect.any(Function) },
      key2: 'value',
    });
  });

  it('formats nested keys correctly', () => {
    const result = autoFormatRecordDeep(
      { key1: { nestedKey: 123 }, key2: 'value' },
      ['key1.nestedKey']
    );
    expect(result).toEqual({
      key1: { nestedKey: { localize: expect.any(Function) } },
      key2: 'value',
    });
  });

  it('does not format keys not included in autoFormattedParameters', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, ['key2']);
    expect(result).toEqual({
      key1: 123,
      key2: { localize: expect.any(Function) },
    });
  });

  it('returns the original object when autoFormattedParameters is undefined', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' });
    expect(result).toEqual({ key1: 123, key2: 'value' });
  });

  it('handles empty autoFormattedParameters array correctly', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, []);
    expect(result).toEqual({ key1: 123, key2: 'value' });
  });

  it('formats multiple keys at different levels correctly', () => {
    const result = autoFormatRecordDeep(
      { key1: 123, key2: { nestedKey: true }, key3: 'value' },
      ['key1', 'key2.nestedKey']
    );
    expect(result).toEqual({
      key1: { localize: expect.any(Function) },
      key2: { nestedKey: { localize: expect.any(Function) } },
      key3: 'value',
    });
  });

  it('handles prefix correctly for nested keys', () => {
    const result = autoFormatRecordDeep(
      { key1: { nestedKey: 123 }, key2: 'value' },
      ['prefix.key1.nestedKey'],
      'prefix.'
    );
    expect(result).toEqual({
      key1: { nestedKey: { localize: expect.any(Function) } },
      key2: 'value',
    });
  });
});
