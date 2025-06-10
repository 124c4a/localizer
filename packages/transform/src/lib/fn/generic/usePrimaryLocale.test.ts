import { loc } from '@localizer/core';

import { usePrimaryLocale } from './usePrimaryLocale.js';

describe('usePrimaryLocale', () => {
  it('returns a localized value for the primary locale', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = usePrimaryLocale(value);
    expect(result.localize('en-FI')).toBe('value for fi-FI');
  });

  it('handles null localized value gracefully', () => {
    const value = loc(() => null);
    const result = usePrimaryLocale(value);
    expect(result.localize('en')).toBe(null);
  });

  it('returns a new Localizable instance', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = usePrimaryLocale(value);
    expect(result).not.toBe(value);
  });
});
