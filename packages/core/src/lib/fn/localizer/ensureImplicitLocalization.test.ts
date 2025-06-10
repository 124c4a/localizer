import { coreOptions } from '../locale/options.js';
import { ensureImplicitLocalization } from './ensureImplicitLocalization.js';

describe('ensureImplicitLocalization', () => {
  it('throws an error when implicit localization is disabled', () => {
    coreOptions.implicitLocalization = false;
    coreOptions.activeLocale = 'en';
    expect(() => ensureImplicitLocalization()).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.'
      )
    );
  });

  it('throws an error when active locale is undefined', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = undefined;
    expect(() => ensureImplicitLocalization()).toThrow(
      new RangeError(
        'Implicit localization requires an active locale to be set.'
      )
    );
  });

  it('returns the active locale when implicit localization is enabled and active locale is set', () => {
    coreOptions.implicitLocalization = true;
    coreOptions.activeLocale = 'en';
    expect(ensureImplicitLocalization()).toBe('en');
  });
});
