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
import { isLocalizable, loc, Localizable } from '@localizer/core';

/**
 * Symbol representing the "zero" plural category.
 *
 * @alpha
 */
export const zero: unique symbol = Symbol();

/**
 * Symbol representing the "one" plural category.
 *
 * @alpha
 */
export const one: unique symbol = Symbol();

/**
 * Symbol representing the "two" plural category.
 *
 * @alpha
 */
export const two: unique symbol = Symbol();

/**
 * Symbol representing the "few" plural category.
 *
 * @alpha
 */
export const few: unique symbol = Symbol();

/**
 * Symbol representing the "many" plural category.
 *
 * @alpha
 */
export const many: unique symbol = Symbol();

/**
 * Symbol representing the "other" plural category.
 *
 * @alpha
 */
export const other: unique symbol = Symbol();

/**
 * Type definition for plural categories.
 *
 * Represents the possible plural categories as symbols.
 *
 * @alpha
 */
export type PluralCategory =
  | typeof zero
  | typeof one
  | typeof two
  | typeof few
  | typeof many
  | typeof other;

/**
 * Type definition for a plural translation map.
 *
 * Maps numeric values or plural categories to their corresponding translations.
 *
 * @typeParam T - The type of numeric values that the map can handle.
 *
 * @alpha
 */
export type PluralTranslationMap<T extends number> = {
  [K in T]?: string | Localizable;
} & {
  [K in PluralCategory]?: string | Localizable;
};

/**
 * Internal mapping of plural categories to their corresponding symbols.
 *
 * @internal
 */
const pluralCategoryMap = { zero, one, two, few, many, other };

/**
 * Plural translation function.
 *
 * Determines the appropriate translation for a given numeric value based on the
 * provided plural translation map and the locale's pluralization rules.
 *
 * @typeParam T - The type of numeric values that the function can handle.
 *
 * @param   value - The numeric value to be pluralized.
 * @param   map   - The translation map containing plural categories and values.
 *
 * @returns       The localized pluralized value.
 *
 * @throws        If no "other" plural category is defined in the map.
 *
 * @alpha
 */
export function plural<T extends number>(
  value: T,
  map: PluralTranslationMap<T>,
): Localizable {
  const pluralRules: Record<string, Intl.PluralRules> = {};

  return loc((locale) => {
    if (locale === null) {
      return '[plural]';
    }

    const pluralRule =
      pluralRules[locale] ??
      (pluralRules[locale] = new Intl.PluralRules(locale));

    const result =
      map[value] ??
      map[pluralCategoryMap[pluralRule.select(value)] as PluralCategory] ??
      map[other];

    if (result === undefined) {
      throw new RangeError(`No 'other' plural category defined`);
    }

    if (isLocalizable(result)) {
      return result.localize(locale);
    } else {
      return result as string;
    }
  });
}
