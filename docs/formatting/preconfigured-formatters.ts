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
import { stringify } from '@localizer/format';

export const demos = {
  stringify: {
    formatter: stringify,
    inputs: [
      ['"Hello, world!"', 'Hello, world!'],
      ['undefined', undefined],
      ['null', null],
      ['true', true],
      ['42', 42],
      ['Math.PI', Math.PI],
      ['Infinity', Infinity],
      ['-Infinity', -Infinity],
      ['NaN', NaN],
      ['[1, 2, 3]', [1, 2, 3]],
      ['{ a: 1, b: 2 }', { a: 1, b: 2 }],
      ['/abc/', /abc/],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ['function() {}', function () {}],
      ['new Date()', new Date()],
      [`${new Date().getTime()}`, new Date().getTime()],
    ],
    locales: [],
  },
};
