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
export default async function updatePr({ github, context }) {
  const label = process.env.CHANGELEVEL ?? 'patch';
  const { data: pullRequest } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  });

  // Remove old labels if needed
  const existingLabels = pullRequest.labels.map((l) => l.name);
  for (const existingLabel of existingLabels) {
    if (existingLabel.startsWith('semver:') && existingLabel !== label) {
      await github.rest.issues.removeLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        name: existingLabel,
      });
    }
  }

  // Add the new label if not already present
  if (!existingLabels.includes(label)) {
    await github.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      labels: [label],
    });
  }

  const ConventionalCommitRegex =
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

  metadata.scope = process.env.MODULES;
  metadata.breaking = process.env.CHANGELEVEL === 'major';
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
