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

const translations = dictionary('translations', {
  en: {
    yes: 'Yes',
    no: 'No',
  },
  fr: {
    yes: 'Oui',
    no: 'Non',
  },
  es: {
    yes: 'Sí',
    no: 'No',
  },
  de: {
    yes: 'Ja',
    no: 'Nein',
  },
});

const yes = translations.key('yes');
const no = translations.key('no');
// #endregion dictionary

// #region localizer
const englishLocalizer = getLocalizer('en-US');
const frenchLocalizer = getLocalizer('fr-FR');

console.log(englishLocalizer(yes));
console.log(frenchLocalizer(no));
// #endregion localizer

export default console.asRef();
