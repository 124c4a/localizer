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
import { loc, ValueRangeFormatter } from '@localizer/core';
import {
  dateTimeFormatter,
  dateTimeRangeFormatter,
} from '@localizer/format-datetime';

import { GenericRangeSeparator } from './generic.js';

/**
 * @public
 * Formats date values.
 */
export const date = dateTimeFormatter({
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});
/**
 * @public
 * Formats time values.
 */
export const time = dateTimeFormatter({
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
/**
 * @public
 * Formats combined date and time values.
 */
export const dateTime = dateTimeFormatter({
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

/**
 * @public
 * Formats a range of dates using a generic separator.
 */
export const dateRange: ValueRangeFormatter<number | Date> = (start, end) =>
  loc`${date(start)}${GenericRangeSeparator}${date(end)}`;
/**
 * @public
 * Formats a range of date and time values.
 */
export const dateTimeRange = dateTimeRangeFormatter({
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});
