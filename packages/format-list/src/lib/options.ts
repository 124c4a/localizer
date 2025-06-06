import { Localizable } from '@localizer/core';
import { Transformer } from '@localizer/transform';

/**
 * Defines the options for formatting a list of localized values.
 *
 * This type supports two modes:
 * - **Intl.ListFormatOptions**: Specifies options for the `Intl.ListFormat` API, including locale matching, message format, and message length.
 * - **Delimiter-based formatting**: Specifies a localized delimiter to join list items.
 *
 * Additionally, a `transform` property can be provided to apply transformations to the formatted list.
 *
 * @example
 * // Using Intl.ListFormatOptions
 * const options = {
 *   localeMatcher: 'best fit',
 *   type: 'conjunction',
 *   style: 'short',
 * };
 *
 * // Using a delimiter
 * const optionsWithDelimiter = {
 *   delimiter: loc`, `,
 *   transform: [value => value.toUpperCase()],
 * };
 *
 * @public
 * @see {@link Intl.ListFormatOptions}, {@link Intl.ListFormat}, {@link Transformer}
 */
export type ListFormatOptions = (
  | {
      /**
       * Specifies the locale matching algorithm to use.
       * @default 'best fit'
       */
      localeMatcher?: 'lookup' | 'best fit';

      /**
       * Specifies the format of the output message.
       * @default 'conjunction'
       */
      type?: 'conjunction' | 'disjunction' | 'unit';

      /**
       * Specifies the length of the formatted message.
       * @default 'long'
       */
      style?: 'long' | 'short' | 'narrow';
    }
  | {
      /**
       * A localized delimiter used to join list items.
       */
      delimiter: Localizable;
    }
) & {
  /** An array of transformation functions to apply to the formatted list. */
  transform?: Transformer<Localizable>[];
};
