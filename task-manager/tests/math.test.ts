import calculateTip from '../src/math'

test('calculate tip', () =>  {
  const total = calculateTip(10, .3);
  if (total !== 13) {
    throw new Error(`Total tip should be 13. We got ${total}`)
  }
  return total;
})