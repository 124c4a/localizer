export type Change = {
  type: 'feature' | 'fix';
  hash: string;
  description: string;
};

export type ChangeLevel = 'major' | 'minor' | 'patch';

export type Context = {
  majorChanges?: string[];
  minorChanges?: string[];

  moduleNames?: Record<string, string>;
  fileChanges?: Record<string, Change[]>;
  moduleChanges?: Record<string, Change[]>;
  moduleLevels?: Record<string, ChangeLevel>;
};
