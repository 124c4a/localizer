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
import { isLocalizable, LocaleCode, Localizable } from '@localizer/core';
import { autoFormat } from '@localizer/format';
import { MessageValue } from 'messageformat/functions';

export function _getMessageValueProxy(
  value: Record<PropertyKey, unknown>,
  locale: LocaleCode,
): Record<PropertyKey, unknown> {
  return new Proxy(value, new MessageValueProxyHandler(locale));
}

class MessageValueProxyHandler implements ProxyHandler<Record<PropertyKey, unknown>> {
  private readonly _locale: LocaleCode;
  private readonly _cache: Record<string, unknown> = {};
  private readonly _prefix: string;

  constructor(locale: LocaleCode, prefix?: string) {
    this._locale = locale;
    this._prefix = prefix ?? '$';
  }

  get(target: Record<PropertyKey, unknown>, prop: PropertyKey): unknown {
    if (typeof prop === 'symbol') {
      // Handle symbols directly
      return Reflect.get(target, prop);
    }
    if (prop in this._cache) {
      // Return cached value if it exists
      return this._cache[prop];
    }

    const value = Reflect.get(target, prop);

    if (
      !!value &&
      typeof value === 'object' &&
      Object.getPrototypeOf(value) !== Date.prototype &&
      !Array.isArray(value) &&
      !isLocalizable(value)
    ) {
      // If the value is an object (excluding Date, Localizable and arrays), create a proxy for it
      this._cache[prop as string] = new Proxy(
        value,
        new MessageValueProxyHandler(this._locale, `${this._prefix}${String(prop)}.`),
      );
    } else {
      // Otherwise, create an AutoFormattedMessageValue for the value
      this._cache[prop as string] = new AutoFormattedMessageValue(
        this._locale,
        `${this._prefix}${String(prop)}`,
        value,
      );
    }

    return this._cache[prop];
  }
}

class AutoFormattedMessageValue implements MessageValue<'autoformat'> {
  private readonly _locale: LocaleCode;
  private readonly _value: unknown;
  private readonly _formattedValue: Localizable;

  readonly source: string;
  readonly type = 'autoformat';

  constructor(locale: LocaleCode, source: string, value: unknown) {
    this.source = source;

    this._locale = locale;
    this._value = value;
    this._formattedValue = autoFormat(value);
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return this._formattedValue.localize(this._locale);
  }
}
