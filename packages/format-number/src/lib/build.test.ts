/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

  it('formats a number correctly for a given locale and extracts parts', () => {
    const formatter = buildFormatter({ style: 'decimal', parts: ['integer'] });
    const result = formatter(1234.56).localize('en-US');
    expect(result).toBe('1234');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildFormatter({ style: 'decimal' });
    const result = formatter(1234.56).localize(null);
    expect(result).toBe('[decimal]');
  });

  it('returns a placeholder for undefined locale when style is not set explicitly', () => {
    const formatter = buildFormatter({});
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
    const formatter = buildRangeFormatter({}, 'decimal');
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1,000–2,000');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildRangeFormatter({}, 'decimal');
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[decimalRange]');
  });

  it('returns a placeholder for undefined locale when style is not set explicitly', () => {
    const formatter = buildRangeFormatter({}, 'decimal');
    const result = formatter(1000, 2000).localize(null);
    expect(result).toBe('[decimalRange]');
  });

  it('filters parts based on source if provided', () => {
    const formatter = buildRangeFormatter(
      { style: 'decimal', parts: ['integer'] },
      'decimal',
      'startRange',
    );
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1000');
  });

  it('applies transformation', () => {
    const formatter = buildRangeFormatter(
      {
        style: 'unit',
        unit: 'kilometer',
        transform: [upperCase],
      },
      'unit',
    );
    const result = formatter(1000, 2000).localize('en-US');
    expect(result).toBe('1,000–2,000 KM');
  });
});

describe('buildUnitFormatter', () => {
  it('formats a number with a unit correctly for a given locale', () => {
    const formatter = buildUnitFormatter({ style: 'unit' }, 'unit', 'unit');
    const result = formatter(100, 'kilometer').localize('en-US');
    expect(result).toBe('100 km');
  });

  it('returns a placeholder for undefined locale', () => {
    const formatter = buildUnitFormatter({ style: 'unit' }, 'unit', 'unit');
    const result = formatter(100, 'kilometer').localize(null);
    expect(result).toBe('[unit]');
  });

  it('applies transform function if provided', () => {
    const formatter = buildUnitFormatter(
      { style: 'unit', transform: [upperCase] },
      'unit',
      'unit',
    );
    const result = formatter(100, 'kilometer').localize('en-US');
    expect(result).toBe('100 KM');
  });
});
