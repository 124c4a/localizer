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
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const {
  SarifBuilder,
  SarifRunBuilder,
  SarifResultBuilder,
} = require('node-sarif-builder');
const { writeFileSync } = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { parseArgs } = require('node:util');

const options = {
  project: {
    type: 'string',
    short: 'p',
    default: '',
    help: 'Path to project.',
  },
};

const { values: args } = parseArgs({
  options,
  allowPositionals: true,
  strict: false,
});

if (!args.project) {
  console.error('Project path is required. Use --project or -p option.');
  process.exit(1);
}

// Load and parse the api-extractor.json file
const extractorConfig = ExtractorConfig.loadFileAndPrepare(
  path.join(args.project, 'api-extractor.json'),
);

// SARIF builder
const sarifBuilder = new SarifBuilder();
// SARIF Run builder
const sarifRunBuilder = new SarifRunBuilder().initSimple({
  toolDriverName: 'API Extractor', // Name of your analyzer tool
  toolDriverVersion: Extractor.version, // Version of your analyzer tool
});

function convertLevelToSarif(logLevel) {
  switch (logLevel) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return 'note';
  }
}

function messageHandler(message) {
  if (message.sourceFilePath) {
    const sarifResultBuilder = new SarifResultBuilder();
    const sarifResultInit = {
      // Transcode to a SARIF level:  can be "warning" or "error" or "note"
      level: convertLevelToSarif(message.logLevel),
      messageText: message.text, // Ex: "any is forbidden !"
      ruleId: message.messageId, // Ex: "no-any"
      fileUri: pathToFileURL(message.sourceFilePath).toString(),
    };
    // When possible, provide location of the issue in the source code
    sarifResultInit.startLine = message.sourceFileLine;
    sarifResultInit.startColumn = message.sourceFileColumn; // any integer >= 1 (optional)

    // Init sarifResultBuilder
    sarifResultBuilder.initSimple(sarifResultInit);
    // Add result to sarifRunBuilder
    sarifRunBuilder.addResult(sarifResultBuilder);
  }
}

// Invoke API Extractor
Extractor.invoke(extractorConfig, {
  // Equivalent to the "--local" command-line parameter
  localBuild: true,

  // Equivalent to the "--verbose" command-line parameter
  showVerboseMessages: true,
  messageCallback: (message) => messageHandler(message),
});

sarifBuilder.addRun(sarifRunBuilder);

writeFileSync(
  path.join(args.project, 'api-extractor.sarif'),
  sarifBuilder.buildSarifJsonString({ indent: false }),
);
