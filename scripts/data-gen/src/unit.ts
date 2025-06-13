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
import { writeFile } from 'node:fs/promises';

/**
 * Generates the `unit.ts` file containing the supported units for unit formatting.
 * The generated file exports types for singular units and a union type for all supported units.
 * @returns A promise that resolves when the file has been written.
 * @internal
 */
export async function writeUnitTs() {
  const cwd = process.cwd();
  const targetFile = `${cwd}/packages/format-number/src/lib/unit.ts`;

  const units = Intl.supportedValuesOf('unit');

  const content = `/* THIS FILE IS AUTO-GENERATED USING "tools/data-gen". DO NOT EDIT! */
  
/**
 * A subset of the CLDR units explicitly sanctioned by the ECMA-402 specification
 * 
 * @see https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
 *
 * @public
 */

export type SingularUnit =
${units.map((it) => `  | '${it}'`).join('\n')};

/**
 * Supported units for unit formatting
 *
 * @public
 */
export type Unit = SingularUnit | \`\${SingularUnit}-per-\${SingularUnit}\`;
`;

  await writeFile(targetFile, content);
}
