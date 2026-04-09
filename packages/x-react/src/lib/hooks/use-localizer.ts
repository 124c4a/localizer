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
import { useContext } from 'react';

import { Context } from '../_/context.js';
import { LocalizerWrapper } from '../_/localizer-wrapper.js';
import { LocalizerContext } from '../localizer-context.js';
import { _reactIntegrationOptions } from '../options.js';

const throwingSetActiveLocale = () => {
  throw new Error(
    'Attempt to set locale without a localizer. Did you use `localizerPlugin` or `LocalizationContext`?',
  );
};

/**
 * Retrieves the current localizer instance.
 *
 * @returns The current localizer instance.
 *
 * @alpha
 */
export function useLocalizer(): LocalizerContext {
  const context = useContext(Context);
  if (!context) {
    return new LocalizerWrapper(_reactIntegrationOptions.defaultLocalizer, throwingSetActiveLocale);
  }
  return context;
}
