import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formartCurrency')

console.log('converts cents into dollars')

// Basic test case
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {console.log('failed');}

// Edge test cases

console.log('works with 0')

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {console.log('failed');}

console.log('round up properly')

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed')
} else {console.log('failed')}

console.log('round down properly')

if (formatCurrency(2000.4) === '20.00') {
  console.log('passed')
} else {console.log('failed')}