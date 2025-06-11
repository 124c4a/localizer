import { Listr } from 'listr2';
import { parseArgs } from 'node:util';

import { Context } from './common';
import { fetchDiff } from './fetchDiff';
import { prepareChangelog } from './prepareChangelog';
import { resolveChanges } from './resolveChanges';
import { resolveModuleNames } from './resolveModuleNames';

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
      title: 'Resolving changes',
      task: (ctx) =>
        resolveChanges(ctx, args.baseRef as string, args.headRef as string),
    },
    {
      title: 'Resolving module names',
      task: (ctx) => resolveModuleNames(ctx),
    },
    {
      title: 'Prepare changelogs',
      task: (ctx) => prepareChangelog(ctx),
    },
    // {
    //   title: '[DEBUG] Printing context',
    //   task: (ctx) => printContext(ctx),
    // },
  ],
  { concurrent: false },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });
