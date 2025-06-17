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
