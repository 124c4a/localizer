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
import { differenceInDays } from 'date-fns/differenceInDays';
import { differenceInHours } from 'date-fns/differenceInHours';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';
import { differenceInMonths } from 'date-fns/differenceInMonths';
import { differenceInQuarters } from 'date-fns/differenceInQuarters';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';
import { differenceInYears } from 'date-fns/differenceInYears';

type TimeDifference = {
  year: number;
  quarter: number;
  month: number;
  week: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

/**
 * @internal
 *
 * Calculates the time difference between two values across multiple granularities.
 *
 * @param value - The target value to compare, either a number (timestamp) or a Date object.
 * @param reference - The reference value to compare against, either a number (timestamp) or a Date object.
 * @returns An object containing the time difference for each granularity:
 *   - `year`: Difference in years.
 *   - `quarter`: Difference in quarters.
 *   - `month`: Difference in months.
 *   - `week`: Difference in weeks (calculated as integer division of days by 7).
 *   - `day`: Difference in days.
 *   - `hour`: Difference in hours.
 *   - `minute`: Difference in minutes.
 *   - `second`: Difference in seconds.
 *
 * The function uses utilities from the `date-fns` library to compute differences for each granularity.
 * Weeks are derived by dividing the number of days by 7 and truncating the result to an integer.
 */
export function _getTimeDifference(
  value: number | Date,
  reference: number | Date,
): TimeDifference {
  return {
    year: differenceInYears(value, reference),
    quarter: differenceInQuarters(value, reference),
    month: differenceInMonths(value, reference),
    week: Math.trunc(differenceInDays(value, reference) / 7) | 0, // Convert to integer number to avoid signed zero
    day: differenceInDays(value, reference),
    hour: differenceInHours(value, reference),
    minute: differenceInMinutes(value, reference),
    second: differenceInSeconds(value, reference),
  };
}
