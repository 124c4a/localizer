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
import { isLocalizable } from './is-localizable.js';

describe('isLocalizable', () => {
  it('returns true for objects with a localize property', () => {
    expect(isLocalizable({ localize: () => '' })).toBe(true);
  });

  it('returns false for objects without a localize property', () => {
    expect(isLocalizable({})).toBe(false);
  });

  it('returns false for null values', () => {
    expect(isLocalizable(null)).toBe(false);
  });

  it('returns false for non-object types', () => {
    expect(isLocalizable('string')).toBe(false);
    expect(isLocalizable(42)).toBe(false);
    expect(isLocalizable(true)).toBe(false);
    expect(isLocalizable(undefined)).toBe(false);
  });

  it('returns false for objects with a non-function localize property', () => {
    expect(isLocalizable({ localize: 'not a function' })).toBe(false);
  });
});
