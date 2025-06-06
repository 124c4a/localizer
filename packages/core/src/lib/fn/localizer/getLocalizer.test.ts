import { getLocalizer } from './getLocalizer.js';
import { loc } from '../localizable/loc.js';

describe('getLocalizer', () => {
  it('should localize', () => {
    const localizer = getLocalizer('en');
    const localizable = loc((locale) => locale);
    expect(localizer(localizable)).toBe('en');
  });
  it('returns a function that localizes dynamic values', () => {
    const localizer = getLocalizer('en');
    const dynamicLocalizable = (value: string) =>
      loc(() => `localized ${value}`);
    const localizedFn = localizer(dynamicLocalizable);
    expect(localizedFn('test')).toBe('localized test');
  });

  it('returns the locale when accessing the locale property', () => {
    const localizer = getLocalizer('en');
    expect(localizer.locale).toBe('en');
  });
});
