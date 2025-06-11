import { loc } from '@localizer/core';

import { capitalize } from './capitalize.js';

describe('capitalize', () => {
  it('capitalizes the first character of a localized string', () => {
    const value = loc(() => 'example');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Example');
  });

  it('handles strings with already capitalized first characters', () => {
    const value = loc(() => 'Example');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Example');
  });

  it('capitalizes the first character of strings with special characters', () => {
    const value = loc(() => 'äxample');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('Äxample');
  });

  it('handles empty strings gracefully', () => {
    const value = loc(() => '');
    const result = capitalize(value);
    expect(result.localize('en')).toBe('');
  });

  it('capitalizes strings correctly for different locales', () => {
    const value = loc`istanbul`;
    const result = capitalize(value);
    expect(result.localize('tr')).toBe('İstanbul');
    expect(result.localize('en')).toBe('Istanbul');
  });
});
