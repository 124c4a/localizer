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
import { execa } from 'execa';

import { Change, ChangeType, Context } from './common';
import { getModuleName } from './resolveModuleNames';

function getFilenames(path: string): [oldName: string, newName: string] {
  if (!path.includes(' => ')) {
    return [path, path];
  }
  const parts = path.split(/[{}]/);
  if (parts.length < 3) {
    return [path, path];
  }
  const pathParts = parts[1].split(' => ');

  return [
    parts[0] + pathParts[0] + parts[2],
    parts[0] + pathParts[1] + parts[2],
  ];
}

function parseCommitType(type?: string): ChangeType {
  switch (true) {
    case type?.trim().startsWith('feat'):
      return 'feature';
    case type?.trim().startsWith('fix'):
      return 'fix';
    default:
      return 'other'; // Default type for unrecognized types
  }
}

export async function fetchDiff(
  ctx: Context,
  baseRef: string,
  headRef: string,
) {
  const { stdout } = await execa('git', [
    'log',
    '--oneline',
    '--numstat',
    '-W',
    '--ignore-space-change',
    '--ignore-blank-lines',
    '-I^import',
    '-I^[ ][*][ ]',
    '-I(describe|it)\\(',
    '-I[a-zA-Z0-9_]*,',
    '-I}$',
    '--no-merges',
    '--no-decorate',
    `${baseRef}..${headRef}`,
  ]);

  let currentChange: Change = {
    type: 'other',
    hash: '',
    description: '',
    changeLevel: {},
  };

  const commitRegex = /^([a-f0-9]+) ([a-z()!]+:)?(.*)$/;

  for (const line of stdout.split('\n').filter(Boolean)) {
    if (!line.includes('\t')) {
      if (currentChange.hash) {
        ctx.changes.push(currentChange);
      }
      currentChange = {
        type: 'other',
        hash: '',
        description: '',
        changeLevel: {},
      };

      // Parse commit line
      const match = commitRegex.exec(line);
      if (match) {
        const [_, hash, type, message] = match;
        currentChange.hash = hash;
        currentChange.type = parseCommitType(type);
        // Remove PR number from message if present
        currentChange.description = message.replace(/\(#\d+\)$/g, '').trim();
      }
    } else {
      const [added, deleted, filePath] = line.split('\t');
      const [oldName, newName] = getFilenames(filePath);

      const moduleName = await getModuleName(newName, ctx.moduleMap);

      if (newName.includes('.spec.')) {
        classifyChangeLevel(added, deleted, oldName, moduleName, currentChange);
      } else if (!currentChange.changeLevel[moduleName]) {
        currentChange.changeLevel[moduleName] = 'patch';
      }
    }
  }
  if (currentChange.hash) {
    ctx.changes.push(currentChange);
  }
}
function classifyChangeLevel(
  added: string,
  deleted: string,
  oldName: string,
  moduleName: string,
  currentChange: Change,
) {
  switch (true) {
    case +deleted > 0:
      currentChange.changeLevel[moduleName] = 'major';
      break;
    case +added > 0 && currentChange.changeLevel[moduleName] !== 'major':
      currentChange.changeLevel[moduleName] = 'minor';
      break;
    case !oldName.includes('.spec.') &&
      currentChange.changeLevel[moduleName] !== 'major':
      currentChange.changeLevel[moduleName] = 'minor';
      break;
    default:
      if (!currentChange.changeLevel[moduleName]) {
        currentChange.changeLevel[moduleName] = 'patch';
      }
  }
}
