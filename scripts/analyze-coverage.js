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
import { Listr } from 'listr2';
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Main entry point for the analyzer tool.
 */
const tasks = new Listr(
  [
    {
      title: 'Reading coverage data',
      task: readCoverageData,
    },
    {
      title: 'Exporting coverage report',
      task: writeCoverageReport,
    },
    {
      title: 'Exporting coverage result',
      task: writeCoverageResult,
    },
  ],
  {
    concurrent: false,
    ctx: { coveredModules: [], coverageReports: {} },
  },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });

//===

async function readCoverageData(ctx) {
  // Get all directories containing package.json files using node:fs
  const packageDirs = await readdir('./packages', { withFileTypes: true });
  const packageMetas = packageDirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter(
      (name) =>
        existsSync(path.join('./packages', name, 'package.json')) &&
        existsSync(
          path.join('./packages', name, 'coverage/coverage-summary.json'),
        ) &&
        existsSync(path.join('./packages', name, 'coverage/coverage.txt')),
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
      const newLines = reportLines.slice(0, 2);

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

//===

async function writeCoverageResult(ctx) {
  await mkdirSync('./tmp', { recursive: true });
  if (ctx.coveredModules.length === 0) {
    await writeFile('./tmp/COVERAGESTATUS', '0');
  } else {
    await writeFile('./tmp/COVERAGESTATUS', '1');
  }
}

//===

async function writeCoverageReport(ctx) {
  if (ctx.coveredModules.length === 0) {
    await writeFile('./tmp/COVERAGEREPORT.md', '');
  } else {
    const lines = [];
    const modules = ctx.coveredModules.sort((a, b) => a.localeCompare(b));

    lines.push(
      '### 🔴 Some branches or functions are not covered by unit tests',
      '',
    );

    for (const module of modules) {
      lines.push(`\`${module}\``, '', '');
      lines.push(ctx.coverageReports[module]);
      lines.push('');
      lines.push('');
    }

    await writeFile('./tmp/COVERAGEREPORT.md', lines.join('\n'));
  }
}
