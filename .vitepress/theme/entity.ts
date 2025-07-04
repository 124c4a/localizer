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
import { Localizable } from '@localizer/core';

export type Entity = {
  name: string;
  summary: string;
  pkg: string;
  argument?: Localizable;
  example: Localizable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => Localizable;
  type: 'number' | 'date' | 'string' | 'other' | 'constant' | 'transformer';
  maturity?: 'alpha' | 'beta' | 'public';
  configurable?: boolean;
  docs: string;
  related?: string[];
};
