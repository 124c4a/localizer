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

export default async function updatePr({ github, context }) {
  const label = process.env.CHANGELEVEL ?? 'patch';
  const { data: pullRequest } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  });

  const modules = process.env.MODULES.split(',')
    .filter((m) => m !== '')
    .map((m) => 'scope:' + m.trim());
  const moduleLabels = await collectScopes();

  // Remove old labels if needed
  const existingLabels = pullRequest.labels.map((l) => l.name);
  for (const existingLabel of existingLabels) {
    if (
      (existingLabel.startsWith('semver:') && existingLabel !== label) ||
      (moduleLabels.includes(existingLabel) && !modules.includes(existingLabel))
    ) {
      await github.rest.issues.removeLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        name: existingLabel,
      });
    }
  }

  const missingLabels = [
    ...modules.filter((m) => !existingLabels.includes(m)),
    ...(existingLabels.includes(label) ? [] : [label]),
  ];

  // Add the new label if not already present
  if (missingLabels.length > 0) {
    await github.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      labels: missingLabels,
    });
  }

  const ConventionalCommitRegex =
    // eslint-disable-next-line sonarjs/slow-regex
    /(?<type>[a-z]+)(\((?<scope>.+)\))?(?<breaking>!)?:\s*(?<description>.+)/i;

  let metadata;

  const message = context.payload.pull_request?.title ?? 'Undefined PR title';
  const match = message.match(ConventionalCommitRegex);

  if (!match) {
    metadata = {
      type: 'chore',
      scope: '',
      description: capitalize(message),
      breaking: false,
    };
  } else {
    metadata = {
      type: match.groups.type || 'chore',
      scope: match.groups.scope || '',
      description: capitalize(match.groups.description) || '',
      breaking: !!match.groups.breaking,
    };
  }

  metadata.breaking = process.env.CHANGELEVEL === 'semver:major';
  const scopePart = metadata.scope ? `(${metadata.scope})` : '';

  const newTitle = `${metadata.type}${scopePart}${metadata.breaking ? '!' : ''}: ${metadata.description}`;

  if (newTitle !== message) {
    await github.rest.pulls.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
      title: newTitle,
    });
  }
}

function capitalize(str) {
  const trimmedStr = str.trim();
  if (trimmedStr.length === 0) {
    return '';
  }
  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1);
}

async function collectScopes() {
  const packageDirs = await readdir('./packages', { withFileTypes: true });
  const packageMetas = packageDirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((name) => existsSync(path.join('./packages', name, 'package.json')));

  const data = [];

  packageMetas.forEach((name) => {
    const packageJsonPath = path.join('./packages', name, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const moduleName = packageJson.name.replace('@localizer/', 'scope:');

    const moduleParts = moduleName.split('-');
    const finalModuleName =
      moduleParts[0] === 'x' ? `${moduleParts[0]}-${moduleParts[1]}` : moduleParts[0];

    if (!data.includes(finalModuleName)) {
      data.push(finalModuleName);
    }
  });

  return data;
}
