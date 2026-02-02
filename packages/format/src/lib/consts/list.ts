/*
 * Copyright 2026 Artem Godin.
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
 * Formatter for conjunction lists. Joins items using a conjunction like "and".
 *
 * @public
 */
export const and = listFormatter({ type: 'conjunction' });

/**
 * Formatter for disjunction lists. Joins items using a disjunction like "or".
 *
 * @public
 */
export const or = listFormatter({ type: 'disjunction' });

/**
 * Formatter for unit lists. Joins items without conjunctions or disjunctions.
 *
 * @public
 */
export const list = listFormatter({ type: 'unit' });
