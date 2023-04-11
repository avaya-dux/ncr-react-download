import { ErrorType, getMessage } from './helper';

describe('getMessage', () => {
  it('show return correct value given an Error object', () => {
    expect(getMessage(new Error('error') as ErrorType)).toEqual('Error: error');
  });
  it('should return correct value given an ErrorType', () => {
    const error = { toString: () => 'error' };
    expect(getMessage(error)).toEqual('error');
  });
  it('should return correct value given an empty object', () => {
    expect(getMessage({})).toMatchInlineSnapshot('"[object Object]"');
  });
  it('should return default given an undefined object', () => {
    expect(getMessage()).toMatchInlineSnapshot('"download failed"');
  });
});
