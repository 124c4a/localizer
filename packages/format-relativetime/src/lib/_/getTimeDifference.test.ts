/*
 * Copyright 2026 Artem Godin.
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
import { _getTimeDifference } from './getTimeDifference.js';

describe('_getTimeDifference', () => {
  it('calculates the correct time difference in all units for positive difference', () => {
    const result = _getTimeDifference(
      new Date('2023-01-02T12:00:00'),
      new Date('2023-01-01T12:00:00'),
    );
    expect(result).toEqual({
      year: 0,
      quarter: 0,
      month: 0,
      week: 0,
      day: 1,
      hour: 24,
      minute: 1440,
      second: 86400,
    });
  });

  it('calculates the correct time difference in all units for negative difference', () => {
    const result = _getTimeDifference(
      new Date('2023-01-01T12:00:00'),
      new Date('2023-01-02T12:00:00'),
    );
    expect(result).toEqual({
      year: 0,
      quarter: 0,
      month: 0,
      week: 0,
      day: -1,
      hour: -24,
      minute: -1440,
      second: -86400,
    });
  });

  it('returns zero for all units when the dates are the same', () => {
    const result = _getTimeDifference(
      new Date('2023-01-01T12:00:00'),
      new Date('2023-01-01T12:00:00'),
    );
    expect(result).toEqual({
      year: 0,
      quarter: 0,
      month: 0,
      week: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    });
  });

  it('handles non-Date inputs by converting them to Date objects', () => {
    const result = _getTimeDifference(
      1672531200000, // Timestamp for 2023-01-01T00:00:00
      1672617600000, // Timestamp for 2023-01-02T00:00:00
    );
    expect(result).toEqual({
      year: 0,
      quarter: 0,
      month: 0,
      week: 0,
      day: -1,
      hour: -24,
      minute: -1440,
      second: -86400,
    });
  });

  it('calculates the correct week difference for dates spanning multiple weeks', () => {
    const result = _getTimeDifference(new Date('2023-01-15'), new Date('2023-01-01'));
    expect(result.week).toBe(2);
  });

  it('handles leap years correctly', () => {
    const result = _getTimeDifference(new Date('2024-02-29'), new Date('2023-02-28'));
    expect(result).toEqual({
      year: 1,
      quarter: 4,
      month: 12,
      week: 52,
      day: 366,
      hour: 8784,
      minute: 527040,
      second: 31622400,
    });
  });
});
