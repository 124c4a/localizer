import { upperCase } from '@localizer/transform';

import { buildFormatter } from './build.js';

describe('buildFormatter', () => {
  it('formats relative time correctly for a given locale', () => {
    const formatter = buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02')
    ).localize('en-US');
    expect(result).toBe('tomorrow');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02')
    ).localize(null);
    expect(result).toBe('[relativeTime]');
  });

  it('applies transform function if provided', () => {
    const formatter = buildFormatter({
      numeric: 'auto',
      transform: [upperCase],
    });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-01-02')
    ).localize('en-US');
    expect(result).toBe('TOMORROW');
  });

  it('handles past relative times correctly', () => {
    const formatter = buildFormatter({ numeric: 'auto' });
    const result = formatter(
      new Date('2023-01-02'),
      new Date('2023-01-01')
    ).localize('en-US');
    expect(result).toBe('yesterday');
  });

  it('handles custom stops for relative time calculation', () => {
    const formatter = buildFormatter({
      numeric: 'auto',
      stops: ['day', 'hour'],
    });
    const result = formatter(
      new Date('2023-01-01T12:12:00'),
      new Date('2023-01-01T15:00:00')
    ).localize('en-US');
    expect(result).toBe('in 2 hours');
  });
});
