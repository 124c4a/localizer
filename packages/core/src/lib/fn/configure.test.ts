import { configure } from './configure.js';
import { Configuration } from '../types/configuration.js';

type ConfigOptions = {
  property1?: string;
};

const config: ConfigOptions = {};

const Config: Configuration<ConfigOptions> = (options: ConfigOptions) => {
  Object.assign(config, options);
};

describe('core', () => {
  it('should set properties', () => {
    config.property1 = undefined;
    configure(
      { Config },
      {
        Config: {
          property1: 'value1',
        },
      }
    );
    expect(config.property1).toBe('value1');
  });
  it('should update properties', () => {
    config.property1 = 'value1';
    configure(
      { Config },
      {
        Config: {
          property1: 'value2',
        },
      }
    );
    expect(config.property1).toBe('value2');
  });
  it('should clear properties', () => {
    config.property1 = 'value1';
    configure(
      { Config },
      {
        Config: {
          property1: undefined,
        },
      }
    );
    expect(config.property1).toBeUndefined();
  });
});
