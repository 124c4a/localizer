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
  .filter((data) => data.card);

const lines = [];

lines.push(`import { Card } from '../card';`);

// Add imports
lines.push('');
lines.push('export const cards: Card[] = [');

entities.forEach((data) => {
  const card = data.card;
  lines.push(`  {`);
  lines.push(`    id: ${JSON.stringify(card.id)},`);
  lines.push(`    title: ${JSON.stringify(card.title)},`);
  lines.push(`    link: ${JSON.stringify(card.link ?? data.filePath)},`);
  lines.push(`    icon: ${JSON.stringify(card.icon)},`);
  lines.push(`    kind: ${JSON.stringify(card.kind)},`);
  lines.push(`    related: ${JSON.stringify(card.related)},`);
  lines.push(`  },`);
});

lines.push('] as const;');

const outputPath = path.join('./.vitepress', 'theme', 'data', 'cards.ts');
if (!existsSync(path.dirname(outputPath))) {
  await mkdir(path.dirname(outputPath), { recursive: true });
}
writeFileSync(outputPath, lines.join('\n'), 'utf-8');
console.log(`Card reference generated at ${outputPath}`);
