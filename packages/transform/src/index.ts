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
/**
 * @public
 * A collection of transformation utilities for localizable values.
 * @packageDocumentation
 */
export type { Transformer } from './lib/types/transform.js';

export { capitalize } from './lib/fn/string/capitalize.js';
export { lowerCase } from './lib/fn/string/lowerCase.js';
export { upperCase } from './lib/fn/string/upperCase.js';

export { apply } from './lib/fn/generic/apply.js';
export { usePrimaryLocale } from './lib/fn/generic/usePrimaryLocale.js';
export { transform } from './lib/fn/transform.js';
