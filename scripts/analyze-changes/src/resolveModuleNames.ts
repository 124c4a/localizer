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
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function getModuleName(
  filePath: string,
  map: Record<string, string>,
): Promise<string> {
  if (map[filePath]) {
    return map[filePath];
  }
  // Test if `package.json` exists in the directory of the file and read it
  if (!filePath?.includes('/')) {
    map[filePath] = 'unknown';
    return 'unknown';
  }
  const packageJsonPath = filePath.replace(/\/[^/]+$/, '/package.json');

  if (existsSync(packageJsonPath)) {
    // Read package.json file as string and parse it as JSON
    const content = await readFile(packageJsonPath);
    if (!content) {
      map[filePath] = 'unknown';
      return 'unknown';
    }
    // parse the content as JSON
    const packageJson = JSON.parse(content.toString());

    if (packageJson.name && !packageJson.private) {
      map[filePath] = packageJson.name;
      return packageJson.name;
    } else {
      return 'unknown';
    }
  } else {
    const parent = filePath.replace(/\/[^/]+$/, '');
    if (parent !== filePath) {
      const moduleName = await getModuleName(parent, map);
      map[filePath] = moduleName;
      return moduleName;
    }
  }
  map[filePath] = 'unknown';
  return 'unknown';
}
