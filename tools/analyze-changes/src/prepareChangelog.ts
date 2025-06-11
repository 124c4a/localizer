import { writeFile } from 'node:fs/promises';

import { Change, ChangeLevel, Context } from './common';

export async function prepareChangelog(ctx: Context) {
  ctx.moduleLevels = ctx.moduleLevels ?? {};
  ctx.moduleChanges = ctx.moduleChanges ?? {};

  const moduleChanges: Record<string, Change[]> = {};
  const moduleLevels: Record<string, ChangeLevel> = {};

  for (const [file, changes] of Object.entries(ctx.fileChanges ?? {})) {
    if (changes.length === 0) {
      continue; // Skip files with no changes
    }
    const moduleName = ctx.moduleNames?.[file] ?? 'unknown';
    if (
      ctx.minorChanges?.includes(file) &&
      moduleLevels[moduleName] !== 'major'
    ) {
      moduleLevels[moduleName] = 'minor';
    } else if (ctx.majorChanges?.includes(file)) {
      moduleLevels[moduleName] = 'major';
    } else if (
      moduleLevels[moduleName] !== 'major' &&
      moduleLevels[moduleName] !== 'minor'
    ) {
      moduleLevels[moduleName] = 'patch';
    }
    moduleChanges[moduleName] = [
      ...(ctx.moduleChanges[moduleName] ?? []),
      ...changes,
    ];
  }

  const sortedModuleNames = Object.keys(moduleChanges).sort();
  const changeLogLines: string[] = [];

  let aggregateLevel = 'patch';

  if (Object.values(moduleLevels).some(Boolean)) {
    changeLogLines.push(`## Overview of changes`);
    changeLogLines.push('');
    for (const moduleName of sortedModuleNames) {
      const level = moduleLevels[moduleName];
      if (level) {
        if (level === 'major') {
          aggregateLevel = 'major';
        } else if (level === 'minor' && aggregateLevel !== 'major') {
          aggregateLevel = 'minor';
        }
        changeLogLines.push(`### \`${moduleName}\` (${level})`);
        changeLogLines.push('');
        if (moduleChanges[moduleName].some((it) => it.type === 'feature')) {
          changeLogLines.push(
            ...moduleChanges[moduleName]
              .filter((it) => it.type === 'feature')
              .map((change) => `- ✨ ${change.description} (${change.hash})`),
          );
          changeLogLines.push('');
        }
        if (moduleChanges[moduleName].some((it) => it.type === 'fix')) {
          changeLogLines.push(
            ...moduleChanges[moduleName]
              .filter((it) => it.type === 'fix')
              .map((change) => `- 🐛 ${change.description} (${change.hash})`),
          );
          changeLogLines.push('');
        }

        ctx.moduleChanges[moduleName] = moduleChanges[moduleName];
        ctx.moduleLevels[moduleName] = moduleLevels[moduleName];
      }
    }
  } else {
    changeLogLines.push(`## No significant changes detected in the modules`);
    changeLogLines.push('');
  }

  await writeFile('tmp/CHANGELOG.md', changeLogLines.join('\n'));
  await writeFile('tmp/CHANGELEVEL', aggregateLevel);
}
