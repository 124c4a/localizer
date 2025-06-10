import { upperCase } from '@localizer/transform';

import { buildFormatter, buildRangeFormatter } from './build.js';

describe('buildFormatter', () => {
  it('formats a date correctly for a given locale', () => {
    const formatter = buildFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('January 1, 2023');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(new Date('2023-01-01')).localize(null);
    expect(result).toBe('[datetime]');
  });

  it('filters parts based on options if provided', () => {
    const formatter = buildFormatter({ year: 'numeric', parts: ['year'] });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('2023');
  });

  it('applies transform function if provided', () => {
    const formatter = buildFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      transform: [upperCase],
    });
    const result = formatter(new Date('2023-01-01')).localize('en-US');
    expect(result).toBe('JANUARY 1, 2023');
  });
});

describe('buildRangeFormatter', () => {
  it('formats a range of dates correctly for a given locale', () => {
    const formatter = buildRangeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ).localize('en-US');
    expect(result).toBe('January 1 – December 31, 2023');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildRangeFormatter({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ).localize(null);
    expect(result).toBe('[datetimeRange]');
  });

  it('filters parts based on source if provided', () => {
    const formatter = buildRangeFormatter(
      { year: 'numeric', month: 'long', day: 'numeric', parts: ['month'] },
      'startRange'
    );
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ).localize('en-US');
    expect(result).toBe('January');
  });

  it('applies transform function if provided', () => {
    const formatter = buildRangeFormatter(
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        transform: [upperCase],
      },
      'shared'
    );
    const result = formatter(
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ).localize('en-US');
    expect(result).toBe('JANUARY 1 – DECEMBER 31, 2023');
  });
});
