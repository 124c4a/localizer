import { parseLocaleCode } from './parseLocaleCode.js';

describe('parseLocaleCode', () => {
  it('returns language and country when locale includes both', () => {
    expect(parseLocaleCode('en-US')).toEqual(['en', 'US']);
  });

  it('returns language and undefined when locale includes only language', () => {
    expect(parseLocaleCode('en')).toEqual(['en', undefined]);
  });
});
