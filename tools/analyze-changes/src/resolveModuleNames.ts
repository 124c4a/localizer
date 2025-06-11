import { readFile } from 'node:fs/promises';

import { Context } from './common';

async function getModuleName(
  filePath: string,
  map: Record<string, string>,
): Promise<string> {
  if (map[filePath]) {
    return map[filePath];
  }
  // Test if `package.json` exists in the directory of the file and read it
  const packageJsonPath = filePath.replace(/\/[^/]+$/, '/package.json');
  try {
    // Read package.json file as string and parse it as JSON
    const content = await readFile(packageJsonPath);
    if (!content) {
      map[filePath] = 'unknown';
      return 'unknown';
    }
    // parse the content as JSON
    const packageJson = JSON.parse(content.toString());

    if (packageJson.name) {
      map[filePath] = packageJson.name;
      return packageJson.name;
    } else {
      return 'unknown';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const parent = filePath.replace(/\/[^/]+$/, '');
    if (parent !== filePath) {
      const moduleName = await getModuleName(parent, map);
      map[filePath] = moduleName;
      return moduleName;
    }
  }
  map[filePath] = 'unknown';
  return 'unknown';
}

export async function resolveModuleNames(ctx: Context) {
  ctx.fileChanges = ctx.fileChanges ?? {};
  ctx.moduleNames = ctx.moduleNames ?? {};
  const files = Object.keys(ctx.fileChanges);
  for (const file of files) {
    await getModuleName(file, ctx.moduleNames);
  }
}
