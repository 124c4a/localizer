import { upperCase } from '@localizer/transform';
import { displayNameFormatter } from './displayNameFormatter.js';

describe('displayNameFormatter', () => {
  it('formats a value using the provided locale and options', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result = formatter('US').localize('en-US');
    expect(result).toBe('United States');
  });

  it('returns a placeholder when locale is undefined', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result = formatter('US').localize(null);
    expect(result).toBe('[region]');
  });

  it('applies a custom transform function if provided', () => {
    const formatter = displayNameFormatter({
      type: 'region',
      transform: [upperCase],
    });
    const result = formatter('US').localize('en-US');
    expect(result).toBe('UNITED STATES');
  });

  it('handles multiple locales with caching', () => {
    const formatter = displayNameFormatter({ type: 'region' });
    const result1 = formatter('US').localize('en-US');
    const result2 = formatter('US').localize('fr-FR');
    expect(result1).toBe('United States');
    expect(result2).toBe('États-Unis');
  });
});
