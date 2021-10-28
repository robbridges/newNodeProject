import {Math} from '../src/math'

test('calculate tip', () =>  {
  const total = Math.calculateTip(10, .3);
  expect(total).toBe(13);
  
});

test('calculates tip with default value', () => {
  const total = Math.calculateTip(10);
  expect(total).toBe(12.50);
});

test('converterts Fahrenheit to Celsius', () => {
  const fahrenheit = Math.fahrenheitToCelsius(32);
  expect(fahrenheit).toBe(0);
});

test('converts celsius to Fahrenheit', () => {
  const celsius = Math.celsiusToFahrenheit(0);
  expect(celsius).toBe(32);
})

test('Should add two numbers', (done) => {
  Math.add(2,3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('Should add two numbers async/await', async () => {
  const sum = await Math.add(10,22);
  expect(sum).toBe(32);
});