export type Change = {
  type: ChangeType;
  hash: string;
  description: string;
  changeLevel: Record<string, ChangeLevel>;
};

export type ChangeType = 'feature' | 'fix' | 'other';

export type ChangeLevel = 'major' | 'minor' | 'patch';

export type Context = {
  changes: Change[];
  moduleMap: Record<string, string>;
};
