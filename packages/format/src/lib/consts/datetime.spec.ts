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
import { configure } from '@localizer/core';

import {
  DefaultDateFormat,
  DefaultTimeFormat,
  DefaultDateTimeFormat,
  date,
  dateRange,
  time,
  dateTime,
} from './datetime.js';

describe('configuration', () => {
  it('should override default date format options', () => {
    configure(
      { DefaultDateFormat },
      {
        DefaultDateFormat: {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        },
      },
    );
    expect(date(new Date('2020-01-01 2:43:56')).localize('fi-FI')).toEqual(
      '01.01.20',
    );
  });

  it('should override default time format options', () => {
    configure(
      { DefaultTimeFormat },
      {
        DefaultTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
        },
      },
    );
    expect(time(new Date('2020-01-01 2:43:56')).localize('fi-FI')).toEqual(
      '2.43.56',
    );
  });

  it('should override default date and time format options', () => {
    configure(
      { DefaultDateTimeFormat },
      {
        DefaultDateTimeFormat: {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
        },
      },
    );
    expect(dateTime(new Date('2020-01-01 2:43:56')).localize('fi-FI')).toEqual(
      '01.01.20 klo 2.43.56',
    );
  });
});

describe('dateRangeFormat', () => {
  it('should format date range correctly', () => {
    configure(
      { DefaultDateFormat },
      {
        DefaultDateFormat: {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        },
      },
    );

    const start = new Date('2020-01-01 2:43:56');
    const end = new Date('2020-01-02 3:44:57');
    expect(dateRange(start, end).localize('fi-FI')).toEqual(
      '01.01.20\u2009\u2013\u200902.01.20',
    );
  });
});
