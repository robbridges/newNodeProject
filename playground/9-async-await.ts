const addition = (a: number, b: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject ('Numbers must be non negative');
      }
      resolve(a + b)
    }, 2000)
  })
}

const doWork = async () => {
  const sum = await addition(1,99);
  const sum2 = await addition(sum, 50);
  const sum3 = await addition(sum2, -3);
  return sum3;
}

doWork().then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
})