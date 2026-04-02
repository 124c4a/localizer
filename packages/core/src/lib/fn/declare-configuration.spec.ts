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
import { declareConfiguration } from './declare-configuration.js';

describe('declareConfiguration', () => {
  beforeEach(() => {
    // Reset the global __LOCALIZER__ object before each test
    delete (globalThis as { __LOCALIZER__?: unknown }).__LOCALIZER__;
  });

  it('should initialize a __LOCALIZER__ if it does not exist', () => {
    assert(globalThis.__LOCALIZER__ === undefined, 'Expected __LOCALIZER__ to be undefined');

    declareConfiguration('testId', {});

    expect(globalThis.__LOCALIZER__).toBeDefined();
  });

  it('should initialize a configuration with the given id and initialConfig', () => {
    const initialConfig = { key: 'value' };
    const [config] = declareConfiguration('testId', initialConfig);

    expect(config).toEqual(initialConfig);
    expect(globalThis.__LOCALIZER__.get('testId')).toEqual(initialConfig);
  });

  it('should return a configurer function that updates the configuration', () => {
    const initialConfig = { key: 'value' };
    const [config, configure] = declareConfiguration('testId', initialConfig);

    configure({ key: 'newValue' });
    expect(config.key).toBe('newValue');
    expect(globalThis.__LOCALIZER__.get('testId')).toEqual({ key: 'newValue' });
  });

  it('should not overwrite existing configuration if the same id is used', () => {
    const initialConfig1 = { key: 'value1' };
    const initialConfig2 = { key: 'value2' };

    declareConfiguration('testId', initialConfig1);
    const [config] = declareConfiguration('testId', initialConfig2);

    expect(config).toEqual(initialConfig1);
    expect(globalThis.__LOCALIZER__.get('testId')).toEqual(initialConfig1);
  });

  it('should allow partial updates to the configuration', () => {
    const initialConfig = { key1: 'value1', key2: 'value2' };
    const [config, configure] = declareConfiguration('testId', initialConfig);

    configure({ key1: 'newValue1' });
    expect(config).toEqual({ key1: 'newValue1', key2: 'value2' });
    expect(globalThis.__LOCALIZER__.get('testId')).toEqual({ key1: 'newValue1', key2: 'value2' });
  });
});
