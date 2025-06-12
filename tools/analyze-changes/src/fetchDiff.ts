import { execa } from 'execa';

import { Change, Context } from './common';
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

  for (const line of stdout.split('\n').filter(Boolean)) {
    if (!line.includes('\t')) {
      if (currentChange.hash) {
        ctx.changes.push(currentChange as Change);
      }
      currentChange = {
        type: 'other',
        hash: '',
        description: '',
        changeLevel: {},
      };

      // Parse commit line
      const match = line.match(/^([a-f0-9]+) ([a-z()!]+:)?(.*)$/);
      if (match) {
        const [_, hash, type, message] = match;
        currentChange.hash = hash;
        switch (true) {
          case type?.trim().startsWith('feat'):
            currentChange.type = 'feature';
            break;
          case type?.trim().startsWith('fix'):
            currentChange.type = 'fix';
            break;
          default:
            currentChange.type = 'other'; // Default type for unrecognized types
        }
        currentChange.description = message.trim();
      }
    } else {
      const [added, deleted, filePath] = line.split('\t');
      const [oldName, newName] = getFilenames(filePath);

      const moduleName = await getModuleName(newName, ctx.moduleMap);

      if (newName.includes('.spec.')) {
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
      } else if (!currentChange.changeLevel[moduleName]) {
        currentChange.changeLevel[moduleName] = 'patch';
      }
    }
  }
  if (currentChange.hash) {
    ctx.changes.push(currentChange as Change);
  }
}
