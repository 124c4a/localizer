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
import { computeRelativeTime } from './computeRelativeTime.js';

describe('computeRelativeTime', () => {
  it('returns the correct value and stop for a positive time difference', () => {
    const result = computeRelativeTime(
      new Date('2023-01-02'),
      new Date('2023-01-01'),
      ['day', 'hour']
    );
    expect(result).toEqual({ value: 1, stop: 'day' });
  });

  it('returns the correct value and stop for a negative time difference', () => {
    const result = computeRelativeTime(
      new Date('2023-01-01'),
      new Date('2023-01-02'),
      ['day', 'hour']
    );
    expect(result).toEqual({ value: -1, stop: 'day' });
  });

  it('returns the last stop with value 0 when no time difference matches', () => {
    const result = computeRelativeTime(
      new Date('2023-01-01T12:00:00'),
      new Date('2023-01-01T12:00:00'),
      ['day', 'hour']
    );
    expect(result).toEqual({ value: 0, stop: 'hour' });
  });

  it('skips stops not included in the provided list', () => {
    const result = computeRelativeTime(
      new Date('2023-01-02'),
      new Date('2023-01-01'),
      ['hour']
    );
    expect(result).toEqual({ value: 24, stop: 'hour' });
  });

  it('handles an empty stops array by returning the default stop', () => {
    const result = computeRelativeTime(
      new Date('2023-01-02'),
      new Date('2023-01-01'),
      []
    );
    expect(result).toEqual({ value: 0, stop: 'second' });
  });

  it('handles non-Date inputs by converting them to Date objects', () => {
    const result = computeRelativeTime(
      1672531200000, // Timestamp for 2023-01-01
      1672617600000, // Timestamp for 2023-01-02
      ['day']
    );
    expect(result).toEqual({ value: -1, stop: 'day' });
  });
});
