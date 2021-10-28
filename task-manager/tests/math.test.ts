import {Math} from '../src/math'

test('calculate tip', () =>  {
  const total = Math.calculateTip(10, .3);
  expect(total).toBe(13);
  
});

test('calculates tip with default value', () => {
  const total = Math.calculateTip(10);
  expect(total).toBe(12.50);
})