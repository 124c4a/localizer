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
import { getTimeDifference } from './getTimeDifference.js';
import { Stop } from './options.js';

const allStops: Stop[] = [
  'year',
  'quarter',
  'month',
  'week',
  'day',
  'hour',
  'minute',
  'second',
];

/**
 * Computes the relative time difference between two values based on the specified stops.
 *
 * @param value - The target value to compare, either a number (timestamp) or a Date object.
 * @param reference - The reference value to compare against, either a number (timestamp) or a Date object.
 * @param stops - An array of stops specifying the granularity of the relative time (e.g., 'year', 'month', 'day', etc.).
 * @returns An object containing:
 *   - `value`: The computed relative time difference.
 *   - `stop`: The granularity level at which the difference was computed.
 *
 * The function iterates through the predefined `allStops` array and calculates the time difference
 * using the `getTimeDifference` utility. It returns the first non-zero difference for the specified stops.
 * If no non-zero difference is found, it defaults to the smallest granularity ('second').
 *
 * @example
 * const result = computeRelativeTime(new Date(), new Date(Date.now() - 86400000), ['day', 'hour']);
 * console.log(result); // Output: { value: 1, stop: 'day' }
 *
 * @internal
 */
export function computeRelativeTime(
  value: number | Date,
  reference: number | Date,
  stops: Stop[]
): {
  value: number;
  stop: Stop;
} {
  const timeDifference = getTimeDifference(value, reference);
  let lastValue: {
    value: number;
    stop: Stop;
  } = {
    value: 0,
    stop: 'second',
  };
  for (const stop of allStops) {
    if (stops.includes(stop)) {
      lastValue = {
        value: timeDifference[stop],
        stop,
      };
      if (lastValue.value != 0) {
        return lastValue;
      }
    }
  }
  return lastValue;
}
