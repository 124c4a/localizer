import {
  LocaleCode,
  Localizable,
  loc,
  getLocaleChain,
  ValueFormatter,
  isLocalizable,
} from '@localizer/core';

/**
 * Type definition for a translation map.
 *
 * Represents a mapping of locale codes to their corresponding translations.
 * Each locale code can be associated with either a string or a localizable value.
 *
 * @template K - The locale code type.
 *
 * @alpha
 * @see {@link translate}
 */
export type TranslationMap = {
  readonly [K in LocaleCode]?: string | Localizable;
};

/**
 * Translation function for dynamic values.
 *
 * Creates a value formatter that dynamically generates a translation map based on the input value.
 *
 * @template V - The type of the input value.
 * @param map - A function that generates a translation map for the given value.
 * @param translationKey - An optional key used as a fallback translation.
 * @returns A function that formats the input value into a localized string.
 *
 * @example
 * const dynamicMap = (value) => ({ en: `Value: ${value}`, fr: `Valeur: ${value}` });
 * const formatter = translate(dynamicMap);
 * console.log(formatter(42).localize("fr")); // Output: "Valeur: 42"
 *
 * @alpha
 * @see {@link TranslationMap}
 */
export function translate<V>(
  map: (value: V) => TranslationMap,
  translationKey?: string
): ValueFormatter<V>;
/**
 * Translation function for static maps.
 *
 * Resolves the appropriate translation for the current locale based on the provided translation map.
 *
 * @param map - A static translation map containing locale codes and their translations.
 * @param translationKey - An optional key used as a fallback translation.
 * @returns A localized string based on the current locale.
 *
 * @example
 * const staticMap = { en: "Hello", fr: "Bonjour" };
 * const localized = translate(staticMap);
 * console.log(localized.localize("en")); // Output: "Hello"
 *
 * @alpha
 * @see {@link TranslationMap}
 */
export function translate(
  map: TranslationMap,
  translationKey?: string
): Localizable;
/**
 * Translation function that can handle both static and dynamic translation maps.
 * @param map
 * @param translationKey
 * @internal
 */
export function translate<V>(
  map: TranslationMap | ((value: V) => TranslationMap),
  translationKey?: string
): Localizable | ValueFormatter<V> {
  if (typeof map === 'function') {
    return (value: V) => translate(map(value));
  } else {
    return loc((locale) => {
      if (!locale) {
        return translationKey ?? '[anonymous translation]';
      }

      const translation =
        getLocaleChain(locale)
          .map((it) => map[it])
          .find((it) => it !== undefined) ??
        translationKey ??
        '[anonymous translation]';

      if (isLocalizable(translation)) {
        return translation.localize(locale);
      } else {
        return translation;
      }
    });
  }
}
