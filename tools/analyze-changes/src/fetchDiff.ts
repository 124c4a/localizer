import { execa } from 'execa';

import { Context } from './common';

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
  ctx.majorChanges = [];
  ctx.minorChanges = [];
  ctx.moduleChanges = {};

  const { stdout } = await execa('git', [
    'diff',
    '--numstat',
    '-W',
    '--ignore-space-change',
    '--ignore-blank-lines',
    '-I^import',
    '-I(describe|it)\\(',
    '-I[a-zA-Z0-9_]*,',
    '-I}$',
    baseRef,
    headRef,
    '--',
    'packages/**/*.spec.*',
    'packages/**/*.test.*',
  ]);

  for (const line of stdout.split('\n')) {
    if (!line.trim()) continue; // Skip empty lines

    const [added, deleted, filePath] = line.split('\t');
    const [oldName, newName] = getFilenames(filePath);

    if (+deleted > 0) {
      ctx.majorChanges.push(newName);
    } else if (+added > 0) {
      ctx.minorChanges.push(newName);
    } else if (!oldName.includes('.spec.') && newName.includes('.spec.')) {
      ctx.minorChanges.push(newName);
    }
  }
}
