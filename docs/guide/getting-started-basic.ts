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
import { getLocalizer, dictionary } from '@localizer/all';

const translations = dictionary({
  yes: {
    en: 'Yes',
    fr: 'Oui',
    es: 'Sí',
    de: 'Ja',
  },
  no: {
    en: 'No',
    fr: 'Non',
    es: 'No',
    de: 'Nein',
  },
});

// Type of translations is:
// {
//   yes: Localizable;
//   no: Localizable;
// }
// #endregion dictionary

// #region localizer
const englishLocalizer = getLocalizer('en-US');
const frenchLocalizer = getLocalizer('fr-FR');

console.log(englishLocalizer(translations.yes));
console.log(frenchLocalizer(translations.yes));
// #endregion localizer

export default console.asRef();
