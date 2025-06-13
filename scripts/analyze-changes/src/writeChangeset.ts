import { writeFile } from 'node:fs/promises';

import { Change, ChangeLevel, Context } from './common';

function getChangeLevelIcon(level: ChangeLevel): string {
  switch (level) {
    case 'major':
      return '🔴'; // Major change
    case 'minor':
      return '🟢'; // Minor change
    case 'patch':
      return '🔵'; // Patch change
    default:
      return ''; // Unknown level
  }
}

// Define the writeChange function
function writeChange(
  change: Change,
  module: string,
  icon: string,
  lines: string[],
) {
  const marker = getChangeLevelIcon(change.changeLevel[module]);

  // Capitalize the first letter of the change type
  const capitalizedDescription =
    change.description.charAt(0).toUpperCase() + change.description.slice(1);
  const changeDescription = capitalizedDescription || 'No description provided';
  lines.push(
    `- ${marker} ${icon}${changeDescription} ([${change.hash}](https://github.com/124c4a/localizer/commit/${change.hash}))`,
  );
}

function collectModules(changes: Change[]): string[] {
  // Collect unique module names from changes and sort them
  const modules = new Set<string>();
  changes.forEach((change) => {
    Object.keys(change.changeLevel).forEach((module) => {
      if (module !== 'unknown') {
        modules.add(module);
      }
    });
  });

  return Array.from(modules).sort((a, b) => a.localeCompare(b));
}

export async function writeChangeset(ctx: Context) {
  const modules = collectModules(ctx.changes);
  const lines: string[] = [];

  if (modules.length === 0) {
    lines.push('### No notable changes detected');
    lines.push('');
  } else {
    lines.push('### Overview of changes');
    lines.push('');

    modules.forEach((module) => {
      writeModuleChanges(ctx.changes, module, lines);
    });

    lines.push(
      '---',
      '',
      'This summarizes the changes made in this PR. Each module is listed with its highest change level.',
      'The change levels are indicated as follows:',
      '',
      '- 🔴 Breaking change',
      '- 🟢 New feature',
      '- 🔵 Insignificant change',
    );
  }

  await writeFile('tmp/CHANGESET.md', lines.join('\n'));
}

export async function writeChangelevel(ctx: Context) {
  const changeLevel = getEffectiveChangeLevel(ctx.changes);
  const modules = Array.from(
    new Set(
      collectModules(ctx.changes).map(
        (module) => module.replace(/@localizer\//g, '').split('-')[0],
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  let preparedModules;
  if (modules.length > 0 && modules.length < 4) {
    preparedModules = modules.join(',');
  } else {
    preparedModules = '';
  }

  await writeFile('tmp/CHANGELEVEL', changeLevel);
  await writeFile('tmp/MODULES', preparedModules);
}

export function getEffectiveChangeLevel(changes: Change[]): ChangeLevel {
  return changes.reduce((max, change) => {
    const levels = Object.values(change.changeLevel);
    if (levels.includes('major')) {
      return 'major';
    } else if (levels.includes('minor') && max !== 'major') {
      return 'minor';
    }
    return max;
  }, 'patch' as ChangeLevel);
}

function writeModuleChanges(
  changes: Change[],
  module: string,
  lines: string[],
) {
  const maxLevel: ChangeLevel = changes.reduce((max, change) => {
    const level = change.changeLevel[module];
    if (level) {
      if (max === 'major' || level === 'major') {
        return 'major';
      } else if (max === 'minor' || level === 'minor') {
        return 'minor';
      }
    }
    return max;
  }, 'patch' as ChangeLevel);

  lines.push(
    `<details><summary>${module} (${getChangeLevelIcon(maxLevel)})</summary>`,
    ``,
  );

  const moduleChanges: Change[] = changes
    .filter((change) => Object.keys(change.changeLevel).includes(module))
    .map((change) => ({
      ...change,
      changeLevel: { [module]: change.changeLevel[module] },
    }));

  if (moduleChanges.some((change) => change.type === 'feature')) {
    moduleChanges
      .filter((change) => change.type === 'feature')
      .forEach((change) => writeChange(change, module, '✨', lines));
  }
  if (moduleChanges.some((change) => change.type === 'fix')) {
    moduleChanges
      .filter((change) => change.type === 'fix')
      .forEach((change) => writeChange(change, module, '🐛', lines));
  }
  if (moduleChanges.some((change) => change.type === 'other')) {
    moduleChanges
      .filter((change) => change.type === 'other')
      .forEach((change) => writeChange(change, module, '', lines));
  }

  lines.push('', '</details>');
  lines.push('');
}
