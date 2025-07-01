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
import { Stop } from '../options.js';
import { _getTimeDifference } from './getTimeDifference.js';

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
 * Computes the relative time difference between two values at specified
 * granularity levels.
 *
 * @param   value     - Target value as a timestamp or Date.
 * @param   reference - Reference value as a timestamp or Date.
 * @param   stops     - Granularity levels (e.g., 'year', 'month', 'day').
 *
 * @returns           An object with:
 *
 *   - `value`: The relative time difference.
 *   - `stop`: The granularity level of the difference.
 *
 * @internal
 */
export function _computeRelativeTime(
  value: number | Date,
  reference: number | Date,
  stops: Stop[],
): {
  value: number;
  stop: Stop;
} {
  const timeDifference = _getTimeDifference(value, reference);
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
