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
import { writeFile } from 'node:fs/promises';

import { Context } from './common';
export async function writeCoverageReport(ctx: Context) {
  if (ctx.coveredModules.length === 0) {
    await writeFile('./tmp/COVERAGEREPORT.md', '');
    return;
  } else {
    const lines: string[] = [];
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
