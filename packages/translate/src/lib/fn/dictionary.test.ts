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
import { asyncDictionary, dictionary } from './dictionary.js';

type Resolvable<T> = Promise<T> & {
  resolve: (t: T) => void;
  reject: (e: unknown) => void;
};
const resolvablePromise = <T = void>(): Resolvable<T> => {
  let resolve: (val: T) => void;
  let reject: (err: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  }) as Resolvable<T>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  promise.resolve = resolve!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  promise.reject = reject!;
  return promise;
};

describe('dictionary', () => {
  it('should initialize with static data', () => {
    const data = {
      en: { greeting: 'Hello' },
      fr: { greeting: 'Bonjour' },
    };
    const dict = dictionary('test', data);

    expect(dict).toBeDefined();
    expect(dict.key('greeting').localize('en')).toBe('Hello');
    expect(dict.key('greeting').localize('fr')).toBe('Bonjour');
  });

  it('should ignore undegined in dictionary data', () => {
    const data = {
      en: { greeting: 'Hello' },
      fi: undefined,
      fr: { greeting: 'Bonjour' },
    };
    const dict = dictionary('test', data);

    expect(dict).toBeDefined();
    expect(dict.key('greeting').localize('en')).toBe('Hello');
    expect(dict.key('greeting').localize('fr')).toBe('Bonjour');
  });

  it('should throw an error if key is not found', () => {
    const data = {
      en: { greeting: 'Hello' },
    };
    const dict = dictionary('test', data);

    expect(() => dict.key('nonexistent').localize('en')).toThrowError(
      'Key "nonexistent" not found for locale "en" or any of it\'s fallback locales. Please ensure the dictionary is loaded correctly.',
    );
  });

  it('should format a key without parameters', () => {
    const data = {
      en: { greeting: 'Hello' },
    };
    const dict = dictionary('test', data);

    expect(dict.key('greeting').localize('en')).toBe('Hello');
  });

  it('should format a key with parameters', () => {
    const data = {
      en: { greeting: 'Hello, {$name}!' },
    };
    const dict = dictionary('test', data);

    expect(dict.key<{ name: string }>('greeting', true)({ name: 'John' }).localize('en')).toBe(
      'Hello, \u2068John\u2069!',
    );
  });

  it('should format a key with typed parameters', () => {
    const data = {
      en: { greeting: 'Hello, {$name :number}!' },
    };
    const dict = dictionary('test', data);

    expect(dict.key<{ name: number }>('greeting', true)({ name: 123 }).localize('en')).toBe(
      'Hello, 123!',
    );
  });

  it('should inherit locale for custom formatted fields from translation', () => {
    const data = {
      en: { greeting: 'Hello, {$value}!' },
      'en-US': { greeting: 'Hello, {$value}!' },
      'en-GB': { greeting: 'Hello, {$value}!' },
    };
    const dict = dictionary('test', data);
    const translation = dict.key<{ value: Date }>(
      'greeting',
      true,
    )({
      value: new Date('2020-03-01'),
    });

    expect(translation.localize('en')).toBe('Hello, \u20683/1/2020\u2069!');
    expect(translation.localize('en-US')).toBe('Hello, \u20683/1/2020\u2069!');
    expect(translation.localize('en-GB')).toBe('Hello, \u206801/03/2020\u2069!');
    expect(translation.localize('de')).toBe('Hello, \u20683/1/2020\u2069!');
    expect(translation.localize('de-DE')).toBe('Hello, \u206801/03/2020\u2069!');
    expect(translation.localize('en-DE')).toBe('Hello, \u206801/03/2020\u2069!');
  });

  it('should inherit locale for builtin formatted fields', () => {
    const data = {
      en: { greeting: 'Hello, {$value :date}!' },
      'en-US': { greeting: 'Hello, {$value :date}!' },
      'en-GB': { greeting: 'Hello, {$value :date}!' },
    };
    const dict = dictionary('test', data);
    const translation = dict.key<{ value: Date }>(
      'greeting',
      true,
    )({
      value: new Date('2020-03-01'),
    });

    expect(translation.localize('en')).toBe('Hello, Mar 1, 2020!');
    expect(translation.localize('en-US')).toBe('Hello, Mar 1, 2020!');
    expect(translation.localize('en-GB')).toBe('Hello, 1 Mar 2020!');
    expect(translation.localize('de')).toBe('Hello, Mar 1, 2020!');
    expect(translation.localize('de-DE')).toBe('Hello, 1 Mar 2020!');
    expect(translation.localize('en-DE')).toBe('Hello, 1 Mar 2020!');
  });

  it('should return id for a key without parameters', () => {
    const data = {
      en: { greeting: 'Hello' },
    };
    const dict = dictionary('test', data);

    expect(dict.key('greeting').localize(null)).toBe('test.greeting');
  });

  it('should return id for a key with parameters', () => {
    const data = {
      en: { greeting: 'Hello, {$name}!' },
    };
    const dict = dictionary('test', data);

    expect(dict.key<{ name: string }>('greeting', true)({ name: 'John' }).localize(null)).toBe(
      'test.greeting',
    );
  });
});

describe('asyncDictionary', () => {
  it('should initialize with static data', async () => {
    const data = {
      en: { greeting: 'Hello' },
      fr: { greeting: 'Bonjour' },
    };
    const dict = await asyncDictionary('test', data);

    expect(dict).toBeDefined();
    expect(dict.key('greeting').localize('en')).toBe('Hello');
    expect(dict.key('greeting').localize('fr')).toBe('Bonjour');
  });

  it('should initialize with promise-based data', async () => {
    const enData = resolvablePromise<{ greeting: string }>();

    const data = {
      en: enData,
    };
    const dict = await asyncDictionary('test', data);
    const awaited = dict.loadLocale('en');

    expect(() => dict.key('greeting').localize('en')).toThrowError(
      'Key "greeting" not found for locale "en" or any of it\'s fallback locales. Please ensure the dictionary is loaded correctly.',
    );

    enData.resolve({ greeting: 'Hello' });
    await awaited;

    expect(dict.key('greeting').localize('en')).toBe('Hello');
    expect(dict.key('greeting').localize('fr')).toBe('Hello');
  });
});
