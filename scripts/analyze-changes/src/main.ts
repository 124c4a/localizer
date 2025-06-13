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
