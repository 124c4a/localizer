import { LocaleCode } from '../consts/locale.js';

/**
 * Represents a type that can be localized based on a given locale.
 *
 * The `Localizable` type is used to define objects or values that can be localized
 * to different languages or regions. It provides a `localize` method that takes a
 * locale code and returns the localized value.
 *
 * @template T - The type of the localized value. Defaults to `string`.
 *
 * @example
 * // Example of a Localizable string
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
 *
 * @example
 * // Example of a Localizable object
 * const localizableObject: Localizable<{ greeting: string }> = loc((locale) => ({
 *     greeting: locale === 'en' ? 'Hello' : 'Hola',
 *   })
 * );
 * console.log(localizableObject.localize('en')); // Output: { greeting: 'Hello' }
 *
 * @example
 * // Locale-independent string
 * const localizableConstant = loc`Locale-independent string value`;
 * console.log(localizer(localizableConstant)); // Output: Locale-independent string value
 *
 * @example
 * // Custom localizable function
 * const customLocalizable = loc((locale) => `Current locale: ${locale}`);
 * console.log(localizer(customLocalizable)); // Output: Current locale: en
 *
 * @example
 * // Localizable object with dynamic properties
 * const dynamicLocalizableObject = loc((locale) => ({ locale, greeting: `Hello in ${locale}` }));
 * console.log(localizer(dynamicLocalizableObject)); // Output: { locale: 'en', greeting: 'Hello in en' }
 *
 * @public
 * @see {@link Localizer}, {@link LocaleCode}, {@link loc}
 */
export type Localizable<T = string> = {
  readonly localize: (locale: LocaleCode | null) => T;
};

/**
 * Represents a type that maps localized values to their resolved types.
 *
 * The `Localized` type is used to transform a structure containing `Localizable` values
 * into a structure where those values are resolved to their localized types.
 *
 * @template T - The type of the original structure containing `Localizable` values.
 *
 * @example
 * // Example of transforming a Localizable structure
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
 *
 * @public
 * @see {@link Localizable}, {@link localizeObject}, {@link localizeArray}
 */
export type Localized<T> = {
  [P in keyof T]: T[P] extends Localizable<infer U> ? U : T[P];
};
