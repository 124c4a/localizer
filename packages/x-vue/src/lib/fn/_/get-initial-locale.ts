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
import { getLocaleChain, LocaleCode } from '@localizer/core';

/**
 * Retrieves the initial locale code for the localization context. This function checks the locale
 * chain and returns the first valid locale code. If no valid locale is found, it defaults to 'en'.
 *
 * @returns The initial locale code based on the locale chain.
 *
 * @internal
 */
export function _getInitialLocale(): LocaleCode {
  const localeChain = getLocaleChain('und' as LocaleCode).filter((it: string) => it !== 'und');
  return localeChain[0] || 'en'; // Default to 'en' if no valid locale is found
}
