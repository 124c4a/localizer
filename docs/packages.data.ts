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
import { existsSync, readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { defineLoader } from 'vitepress';

export interface Data {
  [key: string]: {
    name: string;
    version: string;
    description: string;
  };
}

declare const data: Data;
export { data };

export default defineLoader({
  // type checked loader options
  async load(): Promise<Data> {
    const packageDirs = await readdir('./packages', { withFileTypes: true });
    const packageMetas = packageDirs
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name)
      .filter((name) => existsSync(path.join('./packages', name, 'package.json')));

    const data: Data = {};

    packageMetas.forEach((name) => {
      const packageJsonPath = path.join('./packages', name, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      data[name] = {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
      };
    });

    return data;
  },
});
