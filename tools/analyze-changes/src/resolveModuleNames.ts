import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function getModuleName(
  filePath: string,
  map: Record<string, string>,
): Promise<string> {
  if (map[filePath]) {
    return map[filePath];
  }
  // Test if `package.json` exists in the directory of the file and read it
  if (!filePath?.includes('/')) {
    map[filePath] = 'unknown';
    return 'unknown';
  }
  const packageJsonPath = filePath.replace(/\/[^/]+$/, '/package.json');

  if (existsSync(packageJsonPath)) {
    // Read package.json file as string and parse it as JSON
    const content = await readFile(packageJsonPath);
    if (!content) {
      map[filePath] = 'unknown';
      return 'unknown';
    }
    // parse the content as JSON
    const packageJson = JSON.parse(content.toString());

    if (packageJson.name && !packageJson.private) {
      map[filePath] = packageJson.name;
      return packageJson.name;
    } else {
      return 'unknown';
    }
  } else {
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
