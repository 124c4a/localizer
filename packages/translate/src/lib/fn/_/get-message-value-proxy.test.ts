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
import { CurrentLanguage } from '@localizer/format';
import { MessageValue } from 'messageformat/functions';
import { isProxy } from 'node:util/types';

import { _getMessageValueProxy } from './get-message-value-proxy.js';

describe('_getMessageValueProxy', () => {
  it('should create a proxy for the given value', () => {
    const proxy = _getMessageValueProxy({ foo: 'bar' }, 'en-US');
    expect(isProxy(proxy)).toBe(true);
  });

  it('should return the original value for symbols', () => {
    const value = { [Symbol.toStringTag]: 'Bar' };
    const proxy = _getMessageValueProxy(value, 'en-US');

    expect(String(proxy)).toBe('[object Bar]');
  });

  it('should convert primitive properties to MessageValue', () => {
    const value = { foo: 1234567 };
    const proxy = _getMessageValueProxy(value, 'en-US');

    const foo = proxy.foo as MessageValue<'autoformat'>;

    expect(foo.type).toBe('autoformat');
    expect(foo.source).toBe('$foo');
    expect(foo.toString?.()).toBe('1,234,567');
    expect(foo.valueOf?.()).toBe(1234567);
  });

  it('should convert nested objects to proxies', () => {
    const value = { foo: { bar: 1234567 } };
    const proxy = _getMessageValueProxy(value, 'en-US');

    const bar = proxy.foo.bar as MessageValue<'autoformat'>;

    expect(bar.type).toBe('autoformat');
    expect(bar.source).toBe('$foo.bar');
    expect(bar.toString?.()).toBe('1,234,567');
    expect(bar.valueOf?.()).toBe(1234567);
  });

  it('should convert Date properties to MessageValue', () => {
    const value = { foo: new Date('2023-01-01T00:00:00Z') };
    const proxy = _getMessageValueProxy(value, 'en-US');

    const foo = proxy.foo as MessageValue<'autoformat'>;

    expect(foo.type).toBe('autoformat');
    expect(foo.source).toBe('$foo');
    expect(foo.toString?.()).toBe('1/1/2023');
    expect(foo.valueOf?.()).toBe(value.foo);
  });

  it('should convert Localizable properties to MessageValue', () => {
    const value = { foo: CurrentLanguage };
    const proxy = _getMessageValueProxy(value, 'en-US');

    const foo = proxy.foo as MessageValue<'autoformat'>;

    expect(foo.type).toBe('autoformat');
    expect(foo.source).toBe('$foo');
    expect(foo.toString?.()).toBe('American English');
    expect(foo.valueOf?.()).toBe(value.foo);
  });

  it('should convert array properties to MessageValue', () => {
    const value = { foo: [CurrentLanguage, 'a', 'b', 1234567] };
    const proxy = _getMessageValueProxy(value, 'en-US');

    const foo = proxy.foo as MessageValue<'autoformat'>;

    expect(foo.type).toBe('autoformat');
    expect(foo.source).toBe('$foo');
    expect(foo.toString?.()).toBe('American English, a, b, 1,234,567');
    expect(foo.valueOf?.()).toBe(value.foo);
  });
});
