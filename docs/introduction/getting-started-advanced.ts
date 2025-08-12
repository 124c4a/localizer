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
import { ConsoleStub } from '../_console_stub';
const console = new ConsoleStub();

// #region dictionary
import { getLocalizer } from '@localizer/core';
import { dictionary } from '@localizer/translate';

const translations = dictionary('Translations', {
  en: {
    files: `
.input {$count :number}
.match $count
0   {{No files}}
one {{{$count} file}}
*   {{{$count} files}}`,
  },
  ru: {
    files: `
.input {$count :number}
.match $count
0   {{Нет файлов}}
one {{{$count} файл}}
few {{{$count} файла}}
*   {{{$count} файлов}}`,
  },
});

const files = translations.key('files', true);
// #endregion dictionary

// #region localizer
const englishLocalizer = getLocalizer('en-US');
const russianLocalizer = getLocalizer('ru-RU');

const twentyOneFiles = files({ count: 21 });

console.log(englishLocalizer(twentyOneFiles));
console.log(russianLocalizer(twentyOneFiles));
// #endregion localizer

export default console.asRef();
