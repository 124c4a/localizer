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
import { loc } from '../fn/localizable/loc.js';
import { Localizable } from '../types/localizable.js';

/**
 * Represents an empty localizable string.
 *
 * This is useful for scenarios where an empty string needs to be explicitly treated as a localizable entity.
 *
 * @public
 */
export const Empty: Localizable = loc``;
