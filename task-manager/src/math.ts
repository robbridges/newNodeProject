const calculateTip = (total: number, percent: number): number=> {
  const tip = total * percent;
  return total + tip;
}

export default calculateTip;