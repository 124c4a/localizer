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
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const packageDirs = await readdir('./packages', { withFileTypes: true });
const packageMetas = packageDirs
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name)
  .filter((name) => existsSync(path.join('./packages', name, 'package.json')));

const lines = [];

lines.push(`export const packages = {`);

packageMetas.forEach((name) => {
  const packageJsonPath = path.join('./packages', name, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  lines.push(`  ${JSON.stringify(name)}: {`);
  lines.push(`    name: ${JSON.stringify(packageJson.name)},`);
  lines.push(`    version: ${JSON.stringify(packageJson.version)},`);
  lines.push(`    description: ${JSON.stringify(packageJson.description)}`);
  lines.push(`  },`);
});

lines.push(`} as const;`);

const outputPath = path.join('./.vitepress', 'theme', 'data', 'packages.ts');
if (!existsSync(path.dirname(outputPath))) {
  await mkdir(path.dirname(outputPath), { recursive: true });
}
writeFileSync(outputPath, lines.join('\n'), 'utf-8');
console.log(`Package reference generated at ${outputPath}`);
