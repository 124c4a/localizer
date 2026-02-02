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
import { _isPromise } from './is-promise.js';

describe('_isPromise', () => {
  it('should return true for a Promise object', () => {
    const promise = Promise.resolve('test');
    expect(_isPromise(promise)).toBe(true);
  });

  it('should return false for a non-Promise object', () => {
    const obj = { then: 'not a function' };
    expect(_isPromise(obj)).toBe(false);
  });

  it('should return false for a function that is not a Promise', () => {
    const func = () => ({});
    expect(_isPromise(func)).toBe(false);
  });

  it('should return false for a primitive value', () => {
    expect(_isPromise(42)).toBe(false);
    expect(_isPromise('string')).toBe(false);
    expect(_isPromise(null)).toBe(false);
    expect(_isPromise(undefined)).toBe(false);
    expect(_isPromise(true)).toBe(false);
  });

  it('should return false for an object without a "then" property', () => {
    const obj = {};
    expect(_isPromise(obj)).toBe(false);
  });

  it('should return true for an object with a "then" function', () => {
    const obj = { then: () => ({}) };
    expect(_isPromise(obj)).toBe(true);
  });
});
