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
export type Change = {
  type: ChangeType;
  hash: string;
  description: string;
  changeLevel: Record<string, ChangeLevel>;
};

export type ChangeType = 'feature' | 'fix' | 'other';

export type ChangeLevel = 'major' | 'minor' | 'patch';

export type Context = {
  changes: Change[];
  moduleMap: Record<string, string>;
};
