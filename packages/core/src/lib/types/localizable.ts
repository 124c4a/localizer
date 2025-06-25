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
import { LocaleCode } from '../consts/locale.js';

/**
 * @public
 *
 * Represents a type that can be localized based on a given locale.
 *
 * The `Localizable` type is used to define objects or values that can be localized
 * to different languages or regions. It provides a `localize` method that takes a
 * locale code and returns the localized value.
 *
 * @typeParam T - The type of the localized value. Defaults to `string`.
 *
 * @example
 * Example of a Localizable string
 * ```typescript
 * const localizableString: Localizable<string> = loc((locale) => {
 *     switch (locale) {
 *       case 'en': return 'Hello';
 *       case 'es': return 'Hola';
 *       case 'fr': return 'Bonjour';
 *       default: return 'Hello';
 *     }
 *   }
 * );
 * console.log(localizableString.localize('es')); // Output: Hola
 * ```
 *
 * @example
 * Example of a Localizable object
 * ```typescript
 * const localizableObject: Localizable<{ greeting: string }> = loc((locale) => ({
 *     greeting: locale === 'en' ? 'Hello' : 'Hola',
 *   })
 * );
 * console.log(localizableObject.localize('en')); // Output: { greeting: 'Hello' }
 * ```
 *
 * @example
 * Locale-independent string
 * ```typescript
 * const localizableConstant = loc`Locale-independent string value`;
 * console.log(localizer(localizableConstant)); // Output: Locale-independent string value
 * ```
 *
 * @example
 * Custom localizable function
 * ```typescript
 * const customLocalizable = loc((locale) => `Current locale: ${locale}`);
 * console.log(localizer(customLocalizable)); // Output: Current locale: en
 * ```
 *
 * @example
 * Localizable object with dynamic properties
 * ```typescript
 * const dynamicLocalizableObject = loc((locale) => ({ locale, greeting: `Hello in ${locale}` }));
 * console.log(localizer(dynamicLocalizableObject)); // Output: { locale: 'en', greeting: 'Hello in en' }
 * ```
 *
 * @see {@link Localizer}, {@link LocaleCode}, {@link loc}
 */
export type Localizable<T = string> = {
  readonly localize: (locale: LocaleCode | null) => T;
};

/**
 * @public
 *
 * Represents a type that maps localized values to their resolved types.
 *
 * The `Localized` type is used to transform a structure containing `Localizable` values
 * into a structure where those values are resolved to their localized types.
 *
 * @typeParam T - The type of the original structure containing `Localizable` values.
 *
 * @example
 * Example of transforming a Localizable structure
 * ```typescript
 * type Original = {
 *   greeting: Localizable<string>;
 *   info: Localizable<{ details: string }>;
 * };
 * type Resolved = Localized<Original>;
 * // Resolved is equivalent to:
 * // {
 * //   greeting: string;
 * //   info: { details: string };
 * // }
 * ```
 *
 * @see {@link Localizable}, {@link localizeObject}, {@link localizeArray}
 */
export type Localized<T> = {
  [P in keyof T]: T[P] extends Localizable<infer U> ? U : T[P];
};
