import calculateTip from '../src/math'

test('calculate tip', () =>  {
  const total = calculateTip(10, .3);
  
  return total;
})