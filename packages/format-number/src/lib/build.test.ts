import { upperCase } from '@localizer/transform';
import {
  buildFormatter,
  buildRangeFormatter,
  buildUnitFormatter,
} from './build.js';

describe('buildFormatter', () => {
  it('formats a number correctly for a given locale', () => {
    const formatter = buildFormatter({ style: 'decimal' });
    const result = formatter(1234.56).localize('en-US');
    expect(result).toBe('1,234.56');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildFormatter({ style: 'decimal' });
    const result = formatter(1234.56).localize(null);
    expect(result).toBe('[decimal]');
  });

  it('applies transform function if provided', () => {
    const formatter = buildFormatter({
      style: 'decimal',
      transform: [upperCase],
    });
    const result = formatter(1234.56).localize('en-US');
    expect(result).toBe('1,234.56'.toUpperCase());
  });
});

describe('buildRangeFormatter', () => {
  it('formats a range of numbers correctly for a given locale', () => {
    const formatter = buildRangeFormatter({ style: 'decimal' });
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1,000–2,000');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildRangeFormatter({ style: 'decimal' });
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[decimalRange]');
  });

  it('filters parts based on source if provided', () => {
    const formatter = buildRangeFormatter(
      { style: 'decimal', parts: ['integer'] },
      'startRange'
    );
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1000');
  });
});

describe('buildUnitFormatter', () => {
  it('formats a number with a unit correctly for a given locale', () => {
    const formatter = buildUnitFormatter({ style: 'unit' }, 'unit');
    const result = formatter(100, 'kilometer').localize('en-US');
    expect(result).toBe('100 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildUnitFormatter({ style: 'unit' }, 'unit');
    const result = formatter(100, 'kilometer').localize(null);
    expect(result).toBe('[unit]');
  });

  it('applies transform function if provided', () => {
    const formatter = buildUnitFormatter(
      { style: 'unit', transform: [upperCase] },
      'unit'
    );
    const result = formatter(100, 'kilometer').localize('en-US');
    expect(result).toBe('100 km'.toUpperCase());
  });
});
