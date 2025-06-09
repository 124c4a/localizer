import { differenceInHours } from 'date-fns/differenceInHours';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';
import { differenceInDays } from 'date-fns/differenceInDays';
import { differenceInMonths } from 'date-fns/differenceInMonths';
import { differenceInQuarters } from 'date-fns/differenceInQuarters';
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
 *
 * @example
 * const timeDiff = getTimeDifference(new Date('2023-01-01'), new Date('2022-01-01'));
 * console.log(timeDiff);
 * // Output: { year: 1, quarter: 4, month: 12, week: 52, day: 365, hour: 8760, minute: 525600, second: 31536000 }
 *
 * @internal
 */
export function getTimeDifference(
  value: number | Date,
  reference: number | Date
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
