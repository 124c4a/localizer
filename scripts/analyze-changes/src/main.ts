import { Listr } from 'listr2';
import { parseArgs } from 'node:util';

import { Context } from './common';
import { fetchDiff } from './fetchDiff';
import { writeChangeset, writeChangelevel } from './writeChangeset';

const options = {
  baseRef: {
    type: 'string',
    short: 'b',
    default: '5742dd1231e343378b037136d5e4f3453c3e7895',
    help: 'Base reference.',
  },
  headRef: {
    type: 'string',
    short: 'h',
    default: 'HEAD',
    help: 'Head reference.',
  },
} as const;

const { values: args } = parseArgs({
  options,
  allowPositionals: true,
  strict: false,
});

if (!args.baseRef) {
  console.error('Base reference is required. Use --base-ref or -b option.');
  process.exit(1);
}

/**
 * Main entry point for the analyzer tool.
 */
const tasks = new Listr<Context>(
  [
    {
      title: 'Retrieving list of changed files',
      task: async (ctx) =>
        fetchDiff(ctx, args.baseRef as string, args.headRef as string),
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
  { concurrent: false, ctx: { changes: [], moduleMap: {} } as Context },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });
