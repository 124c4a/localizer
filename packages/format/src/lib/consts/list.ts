import { listFormatter } from '@localizer/format-list';

/**
 * Formatter for creating conjunction lists.
 *
 * This formatter generates lists where items are joined using a conjunction (e.g., "and").
 *
 * @example
 * const formattedList = and([loc`apple`, loc`banana`, loc`cherry`]);
 * console.log(formattedList.localize('en')); // Output: "apple, banana, and cherry"
 *
 * @public
 * @see {@link listFormatter}
 */
export const and = listFormatter({ type: 'conjunction' });
/**
 * Formatter for creating disjunction lists.
 *
 * This formatter generates lists where items are joined using a disjunction (e.g., "or").
 *
 * @example
 * const formattedList = or([loc`apple`, loc`banana`, loc`cherry`]);
 * console.log(formattedList.localize('en')); // Output: "apple, banana, or cherry"
 *
 * @public
 * @see {@link listFormatter}
 */
export const or = listFormatter({ type: 'disjunction' });
/**
 * Formatter for creating unit lists.
 *
 * This formatter generates lists where items are joined without any conjunction or disjunction, typically used for lists of units or items that do not require a grammatical connector.
 *
 * @example
 * const formattedList = list([loc`apple`, loc`banana`, loc`cherry`]);
 * console.log(formattedList.localize('en')); // Output: "apple, banana, cherry"
 *
 * @public
 * @see {@link listFormatter}
 */
export const list = listFormatter({ type: 'unit' });
