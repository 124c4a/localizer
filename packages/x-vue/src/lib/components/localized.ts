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
import { Empty, Localizable } from '@localizer/core';
import { defineComponent } from 'vue';

import { useLocalizer } from '../fn/use-localizer.js';

/**
 * Props for the Localized component.
 *
 * @alpha
 */
export type LocalizedProps = {
  /**
   * The content to be localized.
   *
   * @alpha
   */
  content?: Localizable;
};

/**
 * Component for localizing content.
 *
 * @alpha
 */
export const Localized = /*#__PURE__*/ defineComponent<LocalizedProps>(
  (props) => {
    const { localize } = useLocalizer();
    return () => {
      return [localize(props.content ?? Empty)];
    };
  },
  {
    name: 'x-localized',
    props: ['content'],
  },
);
