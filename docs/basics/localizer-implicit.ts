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
import { configure, Core } from '@localizer/core';

import { ConsoleStub } from '../_console_stub';
const console = new ConsoleStub();

configure(
  { Core },
  {
    Core: {
      activeLocale: undefined,
    },
  },
);

// #region example
import { loc, setActiveLocale } from '@localizer/core';

const localizable = loc((locale) => `Current locale is ${locale}`);

// This will throw an error, because implicit localization is not enabled
// console.log(`Explicit mode: ${localizable}`);

setActiveLocale('en-US');
console.log(`Implicit mode: ${localizable}`);
// #endregion example

configure(
  { Core },
  {
    Core: {
      activeLocale: undefined,
    },
  },
);

export default console.asRef();
