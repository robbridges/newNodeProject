// setTimeout(() => {
//   console.log('Two seconds are up');
// }, 2000)



// const names = ['Rob', 'Mike', 'Steve'];

// const shortName = names.filter((name) => {
//   return name.length <= 4;
// });

// console.log(shortName);

// const geocode = (address : string, callback: Function) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     }
  
//     callback(data)
//   }, 2000)
// }

// geocode('djjdwlak', (data : string) : void => {
//   console.log(data);
// });

// const add = (num1 : number, num2 : number, callback : Function) => {
//   setTimeout(() => {
//     const result = num1 + num2;
//     callback(result);
//   }, 2000)
// }
// add(1,4, (sum : number) : void => {
//   console.log(sum);
// })

const doWorkCallBack = (callback : Function) => {
  setTimeout(() => {
    //callback('This is my error!', undefined)
    callback(undefined, 'Success!');
  }, 2000)
}

doWorkCallBack((error: string, result: string) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
})


