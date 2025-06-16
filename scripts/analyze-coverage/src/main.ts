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

import { Context } from './common';
import { readCoverageData } from './readCoverageData';
import { writeCoverageReport } from './writeCoverageReport';
import { writeCoverageResult } from './writeCoverageResult';

/**
 * Main entry point for the analyzer tool.
 */
const tasks = new Listr<Context>(
  [
    {
      title: 'Reading coverage data',
      task: readCoverageData,
    },
    {
      title: 'Exporting coverage report',
      task: writeCoverageReport,
    },
    {
      title: 'Exporting coverage result',
      task: writeCoverageResult,
    },
  ],
  {
    concurrent: false,
    ctx: { coveredModules: [], coverageReports: {} },
  },
);

tasks
  .run()
  .then(async () => undefined)
  .catch((err) => {
    console.error(err);
  });
