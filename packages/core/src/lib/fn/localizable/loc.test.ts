import { loc } from './loc.js';

describe('L', () => {
  it('returns LocalizableValue for function input', () => {
    const result = loc((locale) => `value for ${locale}`);
    expect(result.localize('en-US')).toBe('value for en-US');
  });

  it('returns UnlocalizableValue for template literal with no expressions', () => {
    const result = loc`Static value`;
    expect(result.localize('en-US')).toBe('Static value');
  });

  it('returns LocalizableValue for template literal with expressions', () => {
    const result = loc`Value: ${loc((locale) => `dynamic ${locale}`)}`;
    expect(result.localize('en-US')).toBe('Value: dynamic en-US');
  });

  it('handles empty template literal gracefully', () => {
    const result = loc``;
    expect(result.localize('en-US')).toBe('');
  });
});
