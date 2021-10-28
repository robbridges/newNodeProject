export class Math {
  public static calculateTip = (total: number, percent: number = .25): number => {
    const tip = total * percent;
    return total + tip;
  }
}


