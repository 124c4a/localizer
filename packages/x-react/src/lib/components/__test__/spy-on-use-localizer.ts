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
import { useLocalizer } from '../../hooks/use-localizer.js';
import { LocalizerContext } from '../../localizer-context.js';

/**
 * Component to spy on the `useLocalizer` function. This component is used to inject the localizer
 * instance into a provided array in tests.
 *
 * @internal
 */
export function SpyOnUseLocalizer({
  useLocalizer: target,
}: {
  useLocalizer: [instance?: LocalizerContext];
}) {
  target[0] = useLocalizer();

  return undefined;
}
