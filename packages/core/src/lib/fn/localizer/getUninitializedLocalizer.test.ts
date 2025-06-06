import { getUninitializedLocalizer } from './getUninitializedLocalizer.js';
import { Empty } from './../../consts/Empty.js';

describe('getUninitializedLocalizer', () => {
  it('should throw error when used', () => {
    const localizer = getUninitializedLocalizer();
    expect(() => localizer(Empty)).toThrow(TypeError);
  });
});
