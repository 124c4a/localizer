import { Localizable, ValueFormatter } from '@localizer/core';

import { translate, TranslationMap } from './translate.js';

/**
 * Creates a dictionary of localized values or value formatters.
 *
 * This function takes a dictionary object (`dict`) where each key maps to either
 * a static translation map or a function that generates a dynamic translation map.
 * It returns a new dictionary where each key maps to either a `Localizable` value
 * or a `ValueFormatter`, depending on the type of the input value.
 *
 * @template T - The type of the input dictionary.
 * @param dict - The input dictionary containing static or dynamic translation maps.
 * @returns A dictionary where each key maps to a localized value or a value formatter.
 *
 * @example
 * const inputDict = {
 *   greeting: { en: "Hello", fr: "Bonjour" },
 *   dynamicValue: (value) => ({ en: `Value: ${value}`, fr: `Valeur: ${value}` }),
 * };
 * const localizedDict = dictionary(inputDict);
 * console.log(localizedDict.greeting.localize("en")); // Output: "Hello"
 * console.log(localizedDict.dynamicValue(42).localize("fr")); // Output: "Valeur: 42"
 *
 * @alpha
 * @see {{@link translate}
 */
export function dictionary<T>(dict: T): {
  readonly [P in keyof T]: T[P] extends (value: infer V) => TranslationMap
    ? ValueFormatter<V>
    : Localizable;
} {
  const result: Record<string, unknown> = {};

  for (const key in dict) {
    result[key] = translate(dict[key] as TranslationMap, key);
  }

  return result as {
    readonly [P in keyof T]: T[P] extends (value: infer V) => TranslationMap
      ? ValueFormatter<V>
      : Localizable;
  };
}
