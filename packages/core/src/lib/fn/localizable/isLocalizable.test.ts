import { isLocalizable } from './isLocalizable.js';

describe('isLocalizable', () => {
  it('returns true for objects with a localize property', () => {
    expect(isLocalizable({ localize: () => '' })).toBe(true);
  });

  it('returns false for objects without a localize property', () => {
    expect(isLocalizable({})).toBe(false);
  });

  it('returns false for null values', () => {
    expect(isLocalizable(null)).toBe(false);
  });

  it('returns false for non-object types', () => {
    expect(isLocalizable('string')).toBe(false);
    expect(isLocalizable(42)).toBe(false);
    expect(isLocalizable(true)).toBe(false);
    expect(isLocalizable(undefined)).toBe(false);
  });

  it('returns false for objects with a non-function localize property', () => {
    expect(isLocalizable({ localize: 'not a function' })).toBe(false);
  });
});
