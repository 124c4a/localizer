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
  lines.push(`- ${marker} ${icon}${changeDescription} (${change.hash})`);
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

  return Array.from(modules).sort();
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

function writeModuleChanges(
  changes: Change[],
  module: string,
  lines: string[],
) {
  const maxLevel: ChangeLevel = changes.reduce((max, change) => {
    const level = change.changeLevel[module];
    return level && (max === 'major' || level === 'major')
      ? 'major'
      : level && (max === 'minor' || level === 'minor')
        ? 'minor'
        : max;
  }, 'patch' as ChangeLevel);

  lines.push(`\`${module}\` (${getChangeLevelIcon(maxLevel)})`);
  lines.push('');

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

  lines.push('');
  lines.push('');
}
