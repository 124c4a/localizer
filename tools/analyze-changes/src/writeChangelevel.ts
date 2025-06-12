import { writeFile } from 'node:fs/promises';

import { Context } from './common';

export async function writeChangelevel(ctx: Context) {
  let changeLevel = 'patch';
  ctx.changes.forEach((change) => {
    if (change.changeLevel) {
      Object.entries(change.changeLevel).forEach(([, level]) => {
        if (level === 'major') {
          changeLevel = 'major';
        } else if (level === 'minor' && changeLevel !== 'major') {
          changeLevel = 'minor';
        }
      });
    }
  });

  await writeFile('tmp/CHANGELEVEL', changeLevel);
}
