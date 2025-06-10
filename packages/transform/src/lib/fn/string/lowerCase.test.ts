import { loc } from '@localizer/core';

import { lowerCase } from './lowerCase.js';

describe('lowerCase', () => {
  it('converts a localized string to lower case', () => {
    const value = loc(() => 'EXAMPLE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('example');
  });

  it('handles strings with mixed case characters', () => {
    const value = loc(() => 'ExAmPlE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('example');
  });

  it('handles strings with special characters', () => {
    const value = loc(() => 'ÄxAmPlE');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('äxample');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = lowerCase(value);
    expect(result.localize('en')).toBe('');
  });

  it('converts strings correctly for different locales', () => {
    const value = loc((locale) => (locale === 'tr' ? 'İSTANBUL' : 'ISTANBUL'));
    const result = lowerCase(value);
    expect(result.localize('tr')).toBe('istanbul');
    expect(result.localize('en')).toBe('istanbul');
  });
});
