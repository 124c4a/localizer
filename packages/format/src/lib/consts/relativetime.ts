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
import { Configurer } from '@localizer/core';
import {
  RelativeTimeFormatOptions,
  relativeTimeFormatter,
} from '@localizer/format-relativetime';

const defaultRelativeTimeFormatOptions: RelativeTimeFormatOptions = {
  stops: ['year', 'month', 'week', 'day', 'hour', 'minute'],
};

/**
 * @public
 *
 * Default relative time format configuration.
 *
 * This function allows overriding the default relative time format options
 * by merging the provided configuration with the existing defaults.
 *
 * @param config - An object containing the configuration options to override the defaults.
 */
export const DefaultRelativeTimeFormat: Configurer<
  RelativeTimeFormatOptions
> = (config) => {
  Object.assign(defaultRelativeTimeFormatOptions, config);
};

/**
 * @public
 *
 * Relative time formatter instance.
 *
 * This instance is created using the default relative time format options
 * and can be used to format relative time strings.
 *
 * @see {@link DefaultRelativeTimeFormat}
 */
export const relativeTime = relativeTimeFormatter(
  defaultRelativeTimeFormatOptions,
);
