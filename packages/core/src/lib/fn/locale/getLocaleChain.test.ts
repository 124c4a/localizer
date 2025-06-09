import { getLocaleChain } from './getLocaleChain.js';

describe('getLocaleChain', () => {
  it('returns the locale and fallback locales when no region is present', () => {
    expect(getLocaleChain('fi')).toEqual(['fi', 'en']);
  });

  it('returns the locale, base language, and fallback locales when region is present', () => {
    expect(getLocaleChain('fi-FI')).toEqual(['fi-FI', 'fi', 'en']);
  });

  it('caches the result for subsequent calls with the same locale', () => {
    const result1 = getLocaleChain('fr-CA');
    const result2 = getLocaleChain('fr-CA');
    expect(result1).toBe(result2);
  });
});
