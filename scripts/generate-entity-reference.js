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
import matter from 'gray-matter';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const docsDir = await readdir('./docs', { withFileTypes: true, recursive: true });
const entities = docsDir
  .filter((file) => file.name.endsWith('.md'))
  .map((file) => {
    const filePath = path.join(file.parentPath, file.name);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    filePath.split(path.sep).shift(); // Remove the leading path separator

    return { ...data, filePath: '/' + filePath.split(path.sep).slice(1).join('/') };
  })
  .filter((data) => data.entity);

const lines = [];

lines.push(`import { Entity } from '../entity';`);
lines.push(`import { loc } from '@localizer/core';`);

// Add imports
entities
  .map((data) => data.entity)
  .forEach((entity) => {
    lines.push(`import { ${entity.name} } from '@localizer/${entity.pkg}';`);
  });

lines.push('');
lines.push('export const entities: Entity[] = [');

entities.forEach((data) => {
  const entity = data.entity;
  lines.push(`  {`);
  lines.push(`    name: ${JSON.stringify(entity.name)},`);
  lines.push(`    summary: ${JSON.stringify(entity.summary)},`);
  lines.push(`    pkg: ${JSON.stringify(entity.pkg)},`);
  lines.push(`    type: ${JSON.stringify(entity.type)},`);
  lines.push(`    maturity: ${JSON.stringify(entity.maturity ?? 'public')},`);
  lines.push(`    configurable: ${JSON.stringify(!!entity.configurable)},`);
  lines.push(`    docs: ${JSON.stringify(data.filePath)},`);
  lines.push(`    related: ${JSON.stringify(entity.related)},`);
  if (entity.argument) {
    lines.push(`    argument: ${entity.argument},`);
  }
  lines.push(`    example: ${entity.example},`);
  lines.push(`    fn: ${entity.fn ?? entity.name},`);
  lines.push(`  },`);
});

lines.push('] as const;');

const outputPath = path.join('./.vitepress', 'theme', 'data', 'entities.ts');
if (!existsSync(path.dirname(outputPath))) {
  await mkdir(path.dirname(outputPath), { recursive: true });
}
writeFileSync(outputPath, lines.join('\n'), 'utf-8');
console.log(`Entity reference generated at ${outputPath}`);
