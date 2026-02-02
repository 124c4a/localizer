/*
 * Copyright 2026 Artem Godin.
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
import { loc } from './loc.js';

describe('loc', () => {
  it('returns LocalizableValue for function input', () => {
    const result = loc((locale) => `value for ${locale}`);
    expect(result.localize('en-US')).toBe('value for en-US');
  });

  it('returns UnlocalizableValue for template literal with no expressions', () => {
    const result = loc`Static value`;
    expect(result.localize('en-US')).toBe('Static value');
  });

  it('returns LocalizableValue for template literal with expressions', () => {
    const nested = loc((locale) => `dynamic ${locale}`);
    const result = loc`Value: ${nested}`;
    expect(result.localize('en-US')).toBe('Value: dynamic en-US');
  });

  it('handles empty template literal gracefully', () => {
    const result = loc``;
    expect(result.localize('en-US')).toBe('');
  });
});
