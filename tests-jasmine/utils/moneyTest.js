import {formatCurrency} from '../../src/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('round up properly', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('round down properly', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });  
});