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
import { getLocalizer } from '@localizer/core';

import { date, time, dateTime, dateRange, dateTimeRange } from './datetime.js';

const localizer = getLocalizer('en-US');

describe('datetime formatters', () => {
  it('should format date correctly', () => {
    const testDate = new Date(2025, 0, 1); // January 1, 2025
    expect(localizer(date(testDate))).toBe('1/1/2025'); // Adjust based on locale
  });

  it('should format time correctly', () => {
    const testDate = new Date(2025, 0, 1, 14, 30, 15); // 14:30:15
    expect(localizer(time(testDate))).toBe('02:30:15 PM'); // Adjust based on locale
  });

  it('should format date and time correctly', () => {
    const testDate = new Date(2025, 0, 1, 14, 30, 15); // January 1, 2025, 14:30:15
    expect(localizer(dateTime(testDate))).toBe('1/1/2025, 02:30:15 PM'); // Adjust based on locale
  });

  it('should format date range correctly', () => {
    const startDate = new Date(2025, 0, 1); // January 1, 2025
    const endDate = new Date(2025, 0, 31); // January 31, 2025
    expect(localizer(dateRange(startDate, endDate))).toBe('1/1/2025\u2009\u2013\u20091/31/2025'); // Adjust based on locale and separator
    expect(dateRange(startDate, endDate).localize('ko-KR')).toBe(
      '2025. 1. 1.\u2009~\u20092025. 1. 31.',
    ); // Adjust based on locale and separator
  });

  it('should format date and time range correctly', () => {
    const startDate = new Date(2025, 0, 1, 14, 30, 15); // January 1, 2025, 14:30:15
    const endDate = new Date(2025, 0, 31, 16, 45, 30); // January 31, 2025, 16:45:30
    expect(localizer(dateTimeRange(startDate, endDate))).toBe(
      '1/1/2025, 2:30:15\u202fPM\u2009\u2013\u20091/31/2025, 4:45:30 PM',
    ); // Adjust based on locale and separator
  });
});
