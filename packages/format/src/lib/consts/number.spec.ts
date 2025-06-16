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
import { configure } from '@localizer/core';

import {
  DefaultDecimalFormat,
  DefaultPercentFormat,
  DefaultCurrencyFormat,
  DefaultUnitFormat,
  percent,
  decimal,
  currency,
  unit,
} from './number.js';

describe('configuration', () => {
  it('should override default decimal format options', () => {
    configure(
      { DefaultDecimalFormat },
      {
        DefaultDecimalFormat: {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    );
    expect(decimal(17).localize('fi-FI')).toEqual('17,00');
  });

  it('should override default percent format options', () => {
    configure(
      { DefaultPercentFormat },
      {
        DefaultPercentFormat: {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    );
    expect(percent(0.17).localize('fi-FI')).toEqual('17,00\u00a0%');
  });

  it('should override default currency format options', () => {
    configure(
      { DefaultCurrencyFormat },
      {
        DefaultCurrencyFormat: {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        },
      },
    );
    expect(currency(17, 'EUR').localize('fi-FI')).toEqual('17,0000\u00a0€');
  });

  it('should override default unit format options', () => {
    configure(
      { DefaultUnitFormat },
      {
        DefaultUnitFormat: {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        },
      },
    );
    expect(unit(17, 'meter').localize('fi-FI')).toEqual('17,0000 m');
  });
});
