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
import { Listr } from 'listr2';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const options = {
  baseRef: {
    type: 'string',
    short: 'b',
    default: '',
    help: 'Base reference.',
  },
  headRef: {
    type: 'string',
    short: 'h',
    default: 'HEAD',
    help: 'Head reference.',
  },
};

const { values: args } = parseArgs({
  options,
  allowPositionals: true,
  strict: false,
});

if (!args.baseRef) {
  console.error('Base reference is required. Use --base-ref or -b option.');
  process.exit(1);
}

/** Main entry point for the analyzer tool. */
const tasks = new Listr(
  [
    {
      title: 'Retrieving list of changed files',
      task: async (ctx) => fetchDiff(ctx, args.baseRef, args.headRef),
    },
    {
      title: 'Write change level',
      task: writeChangelevel,
    },
    {
      title: 'Write change set',
      task: writeChangeset,
    },
  ],
  { concurrent: false, ctx: { changes: [], moduleMap: {} } },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });

//=====

function getFilenames(path) {
  if (!path.includes(' => ')) {
    return [path, path];
  }
  const parts = path.split(/[{}]/);
  if (parts.length < 3) {
    return [path, path];
  }
  const pathParts = parts[1].split(' => ');

  return [parts[0] + pathParts[0] + parts[2], parts[0] + pathParts[1] + parts[2]];
}

function parseCommitType(type) {
  switch (true) {
    case type?.trim().startsWith('feat'):
      return 'feature';
    case type?.trim().startsWith('fix'):
      return 'fix';
    case type?.trim().startsWith('chore'):
      return 'chore';
    default:
      return 'other'; // Default type for unrecognized types
  }
}

async function fetchDiff(ctx, baseRef, headRef) {
  const { stdout } = await execa('git', [
    'log',
    '--oneline',
    '--numstat',
    '-W',
    '--ignore-space-change',
    '--ignore-blank-lines',
    '-I^import',
    '-I^[/ ][/*][* ]',
    '-I(describe|it)\\(',
    '-I[a-zA-Z0-9_]*,',
    '-I}$',
    '--no-merges',
    '--no-decorate',
    `${baseRef}..${headRef}`,
  ]);

  let currentChange = {
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
        const [, hash, type, message] = match;
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
function classifyChangeLevel(added, deleted, oldName, moduleName, currentChange) {
  switch (true) {
    case currentChange.type === 'chore' && !currentChange.changeLevel[moduleName]:
      // Skip chores for change level
      currentChange.changeLevel[moduleName] = 'patch';
      break;
    case +deleted > 0:
      currentChange.changeLevel[moduleName] = 'major';
      break;
    case +added > 0 &&
      currentChange.changeLevel[moduleName] !== 'major' &&
      currentChange.type === 'feature':
      currentChange.changeLevel[moduleName] = 'minor';
      break;
    case !oldName.includes('.spec.') && currentChange.changeLevel[moduleName] !== 'major':
      currentChange.changeLevel[moduleName] = 'minor';
      break;
    default:
      if (!currentChange.changeLevel[moduleName]) {
        currentChange.changeLevel[moduleName] = 'patch';
      }
  }
}

//===

async function getModuleName(filePath, map) {
  if (map[filePath]) {
    return map[filePath];
  }
  // Test if `package.json` exists in the directory of the file and read it
  if (!filePath?.includes('/')) {
    map[filePath] = 'unknown';
    return 'unknown';
  }
  const packageJsonPath = filePath.replace(/\/[^/]+$/, '/package.json');

  if (existsSync(packageJsonPath)) {
    // Read package.json file as string and parse it as JSON
    const content = await readFile(packageJsonPath);
    if (!content) {
      map[filePath] = 'unknown';
      return 'unknown';
    }
    // parse the content as JSON
    const packageJson = JSON.parse(content.toString());

    if (packageJson.name && !packageJson.private) {
      map[filePath] = packageJson.name;
      return packageJson.name;
    } else {
      return 'unknown';
    }
  } else {
    const parent = filePath.replace(/\/[^/]+$/, '');
    if (parent !== filePath) {
      const moduleName = await getModuleName(parent, map);
      map[filePath] = moduleName;
      return moduleName;
    }
  }
  map[filePath] = 'unknown';
  return 'unknown';
}

//===

function getChangeLevelIcon(level) {
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
function writeChange(change, module, icon, lines) {
  const marker = getChangeLevelIcon(change.changeLevel[module]);

  // Capitalize the first letter of the change type
  const capitalizedDescription =
    change.description.charAt(0).toUpperCase() + change.description.slice(1);
  const changeDescription = capitalizedDescription || 'No description provided';
  lines.push(
    `- ${marker} ${icon}${changeDescription} ([${change.hash}](https://github.com/124c4a/localizer/commit/${change.hash}))`,
  );
}

function collectModules(changes) {
  // Collect unique module names from changes and sort them
  const modules = new Set();
  changes.forEach((change) => {
    Object.keys(change.changeLevel).forEach((module) => {
      if (module !== 'unknown') {
        modules.add(module);
      }
    });
  });

  return Array.from(modules).sort((a, b) => a.localeCompare(b));
}

export async function writeChangeset(ctx) {
  const modules = collectModules(ctx.changes);
  const lines = [];

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

export async function writeChangelevel(ctx) {
  const changeLevel = getEffectiveChangeLevel(ctx.changes);
  const modules = Array.from(
    new Set(
      collectModules(ctx.changes).map(
        (module) => module.replace(/@localizer\//g, '').split('-')[0],
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const preparedModules = modules.join(',');

  await mkdirSync('tmp', { recursive: true });
  await writeFile('tmp/CHANGELEVEL', changeLevel);
  await writeFile('tmp/MODULES', preparedModules);
}

export function getEffectiveChangeLevel(changes) {
  return changes.reduce((max, change) => {
    const levels = Object.values(change.changeLevel);
    if (levels.includes('major')) {
      return 'major';
    } else if (levels.includes('minor') && max !== 'major') {
      return 'minor';
    }
    return max;
  }, 'patch');
}

function writeModuleChanges(changes, module, lines) {
  const maxLevel = changes.reduce((max, change) => {
    const level = change.changeLevel[module];
    if (level) {
      if (max === 'major' || level === 'major') {
        return 'major';
      } else if (max === 'minor' || level === 'minor') {
        return 'minor';
      }
    }
    return max;
  }, 'patch');

  lines.push(`<details><summary>${module} (${getChangeLevelIcon(maxLevel)})</summary>`, ``);

  const moduleChanges = changes
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
