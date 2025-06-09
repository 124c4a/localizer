import { currencySymbolFormatter } from './currencySymbolFormatter.js';

describe('currencySymbolFormatter', () => {
  it('formats a currency symbol correctly for a given locale', () => {
    const formatter = currencySymbolFormatter();
    const result = formatter('USD').localize('en-US');
    expect(result).toBe('$');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = currencySymbolFormatter();
    const result = formatter('USD').localize(null);
    expect(result).toBe('[currency]');
  });

  it('applies custom number format options if provided', () => {
    const formatter = currencySymbolFormatter({ currencyDisplay: 'code' });
    const result = formatter('USD').localize('en-US');
    expect(result).toBe('USD');
  });

  it('formats currency symbols for non-English locales', () => {
    const formatter = currencySymbolFormatter();
    const result = formatter('EUR').localize('fr-FR');
    expect(result).toBe('€');
  });
});
