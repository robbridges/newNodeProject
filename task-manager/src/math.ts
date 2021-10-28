export class Math {
  public static calculateTip = (total: number, percent: number = .25): number => {
    const tip = total * percent;
    return total + tip;
  }

  public static fahrenheitToCelsius = (temp: number): number => {
    return (temp -32) / 1.8;
  }

  public static celsiusToFahrenheit = (temp: number): number => {
    return (temp * 1.8) + 32;
  }

  public static add = (a: number, b: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(a + b)
      }, 2000)
    })
  }
}


