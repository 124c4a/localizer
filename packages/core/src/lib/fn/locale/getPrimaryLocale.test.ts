import { getPrimaryLocale } from './getPrimaryLocale.js';

describe('getPrimaryLocale', () => {
  it('returns the same locale when no country is present', () => {
    expect(getPrimaryLocale('en')).toBe('en');
  });

  it('returns the primary locale for a country when available', () => {
    expect(getPrimaryLocale('sv-FI')).toBe('fi-FI');
  });

  it('returns the same locale when no primary locale is defined for the country', () => {
    expect(getPrimaryLocale('fi-FI')).toBe('fi-FI');
  });
});
