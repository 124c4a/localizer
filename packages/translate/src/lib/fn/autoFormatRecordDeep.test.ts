import { autoFormatRecordDeep } from './autoFormatRecordDeep.js';

describe('autoFormatRecordDeep', () => {
  it('formats specified keys at the top level', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, ['key1']);
    expect(result).toEqual({
      key1: { localize: expect.any(Function) },
      key2: 'value',
    });
  });

  it('formats nested keys correctly', () => {
    const result = autoFormatRecordDeep(
      { key1: { nestedKey: 123 }, key2: 'value' },
      ['key1.nestedKey']
    );
    expect(result).toEqual({
      key1: { nestedKey: { localize: expect.any(Function) } },
      key2: 'value',
    });
  });

  it('does not format keys not included in autoFormattedParameters', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, ['key2']);
    expect(result).toEqual({
      key1: 123,
      key2: { localize: expect.any(Function) },
    });
  });

  it('returns the original object when autoFormattedParameters is undefined', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' });
    expect(result).toEqual({ key1: 123, key2: 'value' });
  });

  it('handles empty autoFormattedParameters array correctly', () => {
    const result = autoFormatRecordDeep({ key1: 123, key2: 'value' }, []);
    expect(result).toEqual({ key1: 123, key2: 'value' });
  });

  it('formats multiple keys at different levels correctly', () => {
    const result = autoFormatRecordDeep(
      { key1: 123, key2: { nestedKey: true }, key3: 'value' },
      ['key1', 'key2.nestedKey']
    );
    expect(result).toEqual({
      key1: { localize: expect.any(Function) },
      key2: { nestedKey: { localize: expect.any(Function) } },
      key3: 'value',
    });
  });

  it('handles prefix correctly for nested keys', () => {
    const result = autoFormatRecordDeep(
      { key1: { nestedKey: 123 }, key2: 'value' },
      ['prefix.key1.nestedKey'],
      'prefix.'
    );
    expect(result).toEqual({
      key1: { nestedKey: { localize: expect.any(Function) } },
      key2: 'value',
    });
  });
});
