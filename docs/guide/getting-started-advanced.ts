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
import { getLocalizer, loc } from '@localizer/all';
import { dictionary, plural } from '@localizer/all';
import { zero, one, two, few, many, other } from '@localizer/all';
import { decimal } from '@localizer/all';

const translations = dictionary({
  files: (count: number) => ({
    en: plural(count, {
      [zero]: loc`No files`,
      [one]: loc`${decimal(count)} file`,
      [two]: loc`${decimal(count)} files`,
      [few]: loc`${decimal(count)} files`,
      [many]: loc`${decimal(count)} files`,
      [other]: loc`${decimal(count)} files`,
    }),
    ru: plural(count, {
      [zero]: loc`Нет файлов`,
      [one]: loc`${decimal(count)} файл`,
      [two]: loc`${decimal(count)} файла`,
      [few]: loc`${decimal(count)} файлов`,
      [many]: loc`${decimal(count)} файлов`,
      [other]: loc`${decimal(count)} файлов`,
    }),
  }),
});

// Type of translations is:
// {
//   files: (count: number) => Localizable;
// }
// #endregion dictionary

// #region localizer
const englishLocalizer = getLocalizer('en-US');
const russianLocalizer = getLocalizer('ru-RU');

const twentyOneFile = translations.files(21);

console.log(englishLocalizer(twentyOneFile));
console.log(russianLocalizer(twentyOneFile));
// #endregion localizer

export default console.asRef();
