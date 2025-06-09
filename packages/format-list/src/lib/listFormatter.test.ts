import { loc } from '@localizer/core';
import { listFormatter } from './listFormatter.js';
import { upperCase } from '@localizer/transform';

describe('listFormatter', () => {
  it('formats a list with a custom delimiter for a given locale', () => {
    const formatter = listFormatter({ delimiter: loc`, ` });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US'
    );
    expect(result).toBe('apple, banana, cherry');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = listFormatter({ delimiter: loc`, ` });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      null
    );
    expect(result).toBe('[list]');
  });

  it('applies a transform function to the formatted list', () => {
    const formatter = listFormatter({
      delimiter: loc`, `,
      transform: [upperCase],
    });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US'
    );
    expect(result).toBe('APPLE, BANANA, CHERRY');
  });

  it('formats a list using Intl.ListFormat for a given locale', () => {
    const formatter = listFormatter({ style: 'long', type: 'conjunction' });
    const result = formatter([loc`apple`, loc`banana`, loc`cherry`]).localize(
      'en-US'
    );
    expect(result).toBe('apple, banana, and cherry');
  });

  it('handles empty lists correctly', () => {
    const formatter = listFormatter({ style: 'long', type: 'conjunction' });
    const result = formatter([]).localize('en-US');
    expect(result).toBe('');
  });
});
