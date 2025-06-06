import { L } from '@localizer/core';
import { upperCase } from './upperCase.js';

describe('upperCase', () => {
  it('converts a localized string to upper case', () => {
    const value = L(() => 'example');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('EXAMPLE');
  });

  it('handles strings with mixed case characters', () => {
    const value = L(() => 'ExAmPlE');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('EXAMPLE');
  });

  it('handles strings with special characters', () => {
    const value = L(() => 'äxample');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('ÄXAMPLE');
  });

  it('handles empty strings gracefully', () => {
    const value = L(() => '');
    const result = upperCase(value);
    expect(result.localize('en')).toBe('');
  });

  it('converts strings correctly for different locales', () => {
    const value = L((locale) => (locale === 'tr' ? 'istanbul' : 'istanbul'));
    const result = upperCase(value);
    expect(result.localize('tr')).toBe('İSTANBUL');
    expect(result.localize('en')).toBe('ISTANBUL');
  });
});
