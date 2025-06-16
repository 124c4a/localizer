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

import { Context } from './common.js';
export async function readCoverageData(ctx: Context) {
  // Get all directories containing package.json files using node:fs
  const packageDirs = await readdir('./packages', { withFileTypes: true });
  const packageMetas = packageDirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((name) =>
      existsSync(path.join('./packages', name, 'package.json')),
    );

  const packages = packageMetas.map((name) => {
    const packageJsonPath = path.join('./packages', name, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return { name: packageJson.name, path: packageJsonPath };
  });

  packages.forEach((pkg) => {
    const summary = JSON.parse(
      readFileSync(
        path.join(path.dirname(pkg.path), 'coverage/coverage-summary.json'),
        'utf-8',
      ),
    );
    if (
      +summary.total.branches.total >
        +summary.total.branches.covered + summary.total.branches.skipped ||
      +summary.total.functions.total >
        +summary.total.functions.covered + summary.total.functions.skipped
    ) {
      const report = readFileSync(
        path.join(path.dirname(pkg.path), 'coverage/coverage.txt'),
        'utf-8',
      );

      const reportLines = report.split('\n').slice(1, -2);
      const newLines: string[] = reportLines.slice(0, 2);

      for (let line = 0; line < reportLines.length; line++) {
        if (reportLines[line].startsWith(' ')) {
          const lineParts = reportLines[line].split('|');

          lineParts[0] = lineParts[0]
            .trimEnd()
            .replace(/^ /g, '')
            .replace(/^ /g, '\u21e2\u00a0\u00a0\u00a0');

          reportLines[line] = lineParts.join(' | ');
          if (lineParts[2].trim() !== '100' || lineParts[3].trim() !== '100') {
            newLines.push(reportLines[line]);
          }
        }
      }

      ctx.coveredModules.push(pkg.name);
      ctx.coverageReports[pkg.name] = newLines.join('\n');
    }
  });
}
