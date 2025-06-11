import { Empty } from './../../consts/Empty.js';
import { getUninitializedLocalizer } from './getUninitializedLocalizer.js';

describe('getUninitializedLocalizer', () => {
  it('should throw error when used', () => {
    const localizer = getUninitializedLocalizer();
    expect(() => localizer(Empty)).toThrow(TypeError);
  });
});
