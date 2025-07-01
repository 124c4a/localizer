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
import { LocaleCode } from '../consts/locale.js';

/**
 * Represents a type that can be localized based on a given locale.
 *
 * The `Localizable` type is used to define objects or values that can be
 * localized to different languages or regions. It provides a `localize` method
 * that takes a locale code and returns the localized value.
 *
 * @typeParam T - The type of the localized value. Defaults to `string`.
 *
 * @public
 *
 * @see {@link Localizer} , {@link LocaleCode}
 */
export type Localizable<T = string> = {
  readonly localize: (locale: LocaleCode | null) => T;
};

/**
 * Transforms a structure with `Localizable` values into one with resolved
 * types.
 *
 * @typeParam T - The original structure containing `Localizable` values.
 *
 * @public
 *
 * @see {@link Localizable}
 */
export type Localized<T> = {
  [P in keyof T]: T[P] extends Localizable<infer U> ? U : T[P];
};
