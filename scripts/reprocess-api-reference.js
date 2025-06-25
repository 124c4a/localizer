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
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const inputDir = './tmp/api';
const outputFile = './docs/api';

const sources = await readdir('./tmp/api', {
  withFileTypes: true,
  recursive: true,
});

// Recreate the output directory
await rm(outputFile, { recursive: true, force: true });
await mkdir(outputFile, { recursive: true });

for (const source of sources) {
  const relativePath = relative(inputDir, source.parentPath);
  const outputPath = resolve(outputFile, relativePath);

  if (source.isDirectory()) {
    await mkdir(resolve(outputPath, source.name), { recursive: true });
  } else {
    const content = await readFile(
      resolve(source.parentPath, source.name),
      'utf-8',
    );
    console.log(`Processing: ${relativePath}/${source.name}`);

    const processedContent = source.name.endsWith('.md')
      ? reprocessContent(content)
      : content;
    await writeFile(
      resolve(outputPath, source.name),
      processedContent,
      'utf-8',
    );
  }
}

function reprocessContent(content) {
  const lines = content.split(/[\n\r]/);

  const headerIndex = lines.findIndex((line) => line.startsWith('# '));

  if (headerIndex === -1) {
    return content; // No header found, return original content
  }

  const alphaIndex = lines.findIndex((line) => line.startsWith('**`Alpha`**'));
  const betaIndex = lines.findIndex((line) => line.startsWith('**`Beta`**'));

  if (alphaIndex !== -1) {
    lines[headerIndex] =
      lines[headerIndex] + ' <Badge type="warning" text="experimental" />';
    lines.splice(alphaIndex, 1);
  } else if (betaIndex !== -1) {
    lines[headerIndex] =
      lines[headerIndex] + ' <Badge type="tip" text="preview" />';
    lines.splice(betaIndex, 1);
  }

  return lines
    .map((line) =>
      line
        .replace('**`Alpha`**', '<Badge type="warning" text="experimental" />')
        .replace('**`Beta`**', '<Badge type="tip" text="preview" />'),
    )
    .join('\n');
}
