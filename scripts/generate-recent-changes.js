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
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const packageDirs = await readdir('./packages', { withFileTypes: true });
const packageMetas = packageDirs
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name)
  .filter((name) => existsSync(path.join('./packages', name, 'package.json')));

const features = [];
const fixes = [];

const now = new Date();

packageMetas.forEach((name) => {
  const changelogPath = path.join('./packages', name, 'CHANGELOG.md');
  const changelog = existsSync(changelogPath)
    ? readFileSync(changelogPath, 'utf-8').split(/^#{1,3} \d+\.\d\.\d /gm)
    : [];

  for (let i = 1; i < changelog.length; i++) {
    // Extract date in format of (YYYY-MM-DD)
    const dateMatch = changelog[i].match(/\((\d{4}-\d{2}-\d{2})\)/);
    if (dateMatch) {
      const date = new Date(dateMatch[1]);
      if (date.getTime() > now.getTime() - 30 * 24 * 60 * 60 * 1000) {
        // If the date is within the last 30 days, process the changelog
        const featureMatches = extractSection(changelog[i], '🚀 Features');
        const fixMatches = extractSection(changelog[i], '🩹 Fixes');

        if (featureMatches) {
          features.push(
            ...featureMatches
              .trim()
              .split('\n')
              .map((line) => line.trim())
              .map((line) => {
                if (line.includes('(experimental)')) {
                  return line.replace('(experimental)', '').trim() + ' <Experimental />';
                }
                return line;
              })
              .map((line) => {
                if (line.includes('(preview)')) {
                  return line.replace('(preview)', '').trim() + ' <Preview />';
                }
                return line;
              })
              .map((line) => line + ' <Package name="' + name + '" />'),
          );
        }

        if (fixMatches) {
          fixes.push(
            ...fixMatches
              .trim()
              .split('\n')
              .map((line) => line.trim())
              .map((line) => {
                if (line.includes('(experimental)')) {
                  return line.replace('(experimental)', '').trim() + ' <Experimental />';
                }
                return line;
              })
              .map((line) => {
                if (line.includes('(preview)')) {
                  return line.replace('(preview)', '').trim() + ' <Preview />';
                }
                return line;
              })
              .map((line) => line + ' <Package name="' + name + '" />'),
          );
        }
      }
    }
  }
});

const lines = [];

if (features.length > 0 || fixes.length > 0) {
  lines.push('## Recent changes');
  lines.push('');
  lines.push(
    'This section lists the most recent changes made to the packages. For a complete history, please refer to the individual package changelogs.',
  );
  lines.push('');
  if (features.length > 0) {
    lines.push('### New features');
    lines.push('');
    lines.push(...deduplicateLines(features));
    lines.push('');
  }
  if (fixes.length > 0) {
    lines.push('### Fixes');
    lines.push('');
    lines.push(...deduplicateLines(fixes));
    lines.push('');
  }
}

const outputPath = path.join('./docs', 'changelog.inc');
writeFileSync(outputPath, lines.join('\n'), 'utf-8');
console.log(`Recent changes written to ${outputPath}`);

function deduplicateLines(lines) {
  const seen = new Set();
  const packageRest = {};

  lines
    .filter((line) => !!line)
    .forEach((line) => {
      const lineParts = line.split('<Package name="');
      if (lineParts.length > 1) {
        const rest = lineParts[1];
        if (!packageRest[lineParts[0]]) {
          packageRest[lineParts[0]] = [];
        }
        packageRest[lineParts[0]].push(rest);
      }

      seen.add(lineParts[0]);
    });

  return Array.from(seen)
    .sort((a, b) => a.localeCompare(b))
    .map((line) => {
      if (packageRest[line]) {
        return (
          line +
          ' <Packages :names="[\'' +
          packageRest[line].map((it) => it.split('"')[0]).join("', '") +
          '\']" />'
        );
      }
      return line;
    });
}

function extractSection(changelog, section) {
  const matches = changelog.match(new RegExp(`#{2,3} ${section}(.*?)(?=#{2,3}|$)`, 's'));
  return matches ? matches[1].trim() : '';
}
