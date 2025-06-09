import { loc } from '@localizer/core';
import { apply } from './apply.js';

describe('apply', () => {
  it('applies the function to the localized value', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = apply(value, (v) => v.toUpperCase());
    expect(result.localize('en')).toBe('VALUE FOR EN');
  });

  it('returns a new Localizable instance', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = apply(value, (v) => v.toUpperCase());
    expect(result).not.toBe(value);
  });

  it('applies the function correctly for different locales', () => {
    const value = loc((locale) => `value for ${locale}`);
    const result = apply(value, (v) => v.replace('value', 'transformed'));
    expect(result.localize('en')).toBe('transformed for en');
    expect(result.localize('fi')).toBe('transformed for fi');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = apply(value, (v) => v + ' transformed');
    expect(result.localize('en')).toBe(' transformed');
  });
});
