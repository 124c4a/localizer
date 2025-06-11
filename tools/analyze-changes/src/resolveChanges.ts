import { execa } from 'execa';
import { asyncScheduler, Subject } from 'rxjs';

import { Change, Context } from './common';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getChange(commit: string): Change | undefined {
  const [hash, ...message] = commit.split(' ');
  const match = message
    .join(' ')
    .match(
      /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)[^:]*:\s*(.*)$/,
    );
  if (match) {
    const [, type, description] = match;
    switch (type) {
      case 'feat':
        return {
          type: 'feature',
          hash,
          description: capitalizeFirstLetter(description),
        };
      case 'fix':
        return {
          type: 'fix',
          hash,
          description: capitalizeFirstLetter(description),
        };
      default:
        return undefined; // Ignore other types of changes
    }
  } else {
    return {
      type: 'feature',
      hash,
      description: capitalizeFirstLetter(message.join(' ')),
    };
  }
}

export function resolveChanges(
  ctx: Context,
  baseRef: string,
  headRef: string,
): Subject<string> {
  const files = Array.from(
    new Set([...(ctx.majorChanges ?? []), ...(ctx.minorChanges ?? [])]),
  ).sort();

  const subject = new Subject<string>();

  asyncScheduler.schedule(async () => {
    for (const file of files) {
      subject.next(file);

      const { stdout } = await execa('git', [
        'log',
        '--follow',
        '--oneline',
        `${baseRef}..${headRef}`,
        '--',
        file,
      ]);

      const commits = stdout.split('\n').filter(Boolean);

      ctx.fileChanges = ctx.fileChanges || {};
      ctx.fileChanges[file] = commits
        .map(getChange)
        .filter(Boolean) as Change[];
    }

    subject.complete();
  });

  return subject;
}
