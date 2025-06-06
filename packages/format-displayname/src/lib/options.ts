import { Localizable } from '@localizer/core';
import { Transformer } from '@localizer/transform';

/**
 * Defines the options for formatting display names using the `Intl.DisplayNames` API.
 *
 * @example
 * const options: DisplayNameFormatOptions = {
 *   type: 'region',
 *   style: 'short',
 *   fallback: 'code',
 *   transform: [upperCase],
 * };
 *
 * @public
 * @see {@link Localizable}, {@link Transformer}, {@link Intl.DisplayNames}
 */
export type DisplayNameFormatOptions = {
  /**
   * Specifies the locale matching algorithm to use.
   * Can be 'lookup' or 'best fit'.
   */
  localeMatcher?: 'lookup' | 'best fit';
  /**
   * Specifies the style of the display name.
   * Can be 'long', 'short', or 'narrow'.
   */
  style?: 'long' | 'short' | 'narrow';
  /**
   * Specifies the type of display name to format.
   * Possible values include:
   * - 'language': Formats language names.
   * - 'region': Formats region names.
   * - 'script': Formats script names.
   * - 'calendar': Formats calendar names.
   * - 'dateTimeField': Formats date-time field names.
   * - 'currency': Formats currency names.
   */
  type:
    | 'language'
    | 'region'
    | 'script'
    | 'calendar'
    | 'dateTimeField'
    | 'currency';
  /**
   * Specifies how language names are displayed.
   */
  languageDisplay?: 'dialect' | 'standard';
  /**
   * Specifies the fallback behavior when a display name cannot be generated.
   * Can be 'code' or 'none'.
   */
  fallback?: 'code' | 'none';

  /**
   * An array of transformation functions to apply to the formatted display name.
   * Each function takes a Localizable object and returns a transformed Localizable object.
   */
  transform?: Transformer<Localizable>[];
};
