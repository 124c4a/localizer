import { isLocalizable, loc, Localizable } from '@localizer/core';

/**
 * Symbol representing the "zero" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const zero: unique symbol = Symbol();
/**
 * Symbol representing the "one" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const one: unique symbol = Symbol();
/**
 * Symbol representing the "two" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const two: unique symbol = Symbol();
/**
 * Symbol representing the "few" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const few: unique symbol = Symbol();
/**
 * Symbol representing the "many" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const many: unique symbol = Symbol();
/**
 * Symbol representing the "other" plural category.
 *
 * @alpha
 * @see {@link PluralCategory}, @see {@link plural}, @see {@link PluralTranslationMap}
 */
export const other: unique symbol = Symbol();

/**
 * Type definition for plural categories.
 *
 * Represents the possible plural categories as symbols.
 *
 * @alpha
 * @see @see {@link plural}, @see {@link PluralTranslationMap}
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
 * @template T - The type of numeric values that the map can handle.
 * @alpha
 * @see {@link PluralCategory}, {@link plural}, {@link Localizable}
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
 * Determines the appropriate translation for a given numeric value based on
 * the provided plural translation map and the locale's pluralization rules.
 *
 * @template T - The type of numeric values that the function can handle.
 * @param value - The numeric value to be pluralized.
 * @param map - The translation map containing plural categories and values.
 * @returns The localized pluralized value.
 * @throws {RangeError} If no "other" plural category is defined in the map.
 *
 * @example
 * const map = {
 *   [zero]: loc`No items`,
 *   [one]: loc`One item`,
 *   [other]: loc`${value} items`,
 * };
 * const pluralizer = (value:number) => plural(2, {
 *   [zero]: loc`No items`,
 *   [one]: loc`One item`,
 *   [other]: loc`${value} items`,
 * });
 * console.log(result.localize('en')); // Output: "2 items"
 *
 * @alpha
 * @see {@link PluralTranslationMap}, {@link translate}
 */
export function plural<T extends number>(
  value: T,
  map: PluralTranslationMap<T>
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
