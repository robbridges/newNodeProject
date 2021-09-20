setTimeout(() => {
  console.log('Two seconds are up');
}, 2000)



const names = ['Rob', 'Mike', 'Steve'];

const shortName = names.filter((name) => {
  return name.length <= 4;
});

console.log(shortName);

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    }
  
    callback(data)
  }, 2000)
}

geocode('djjdwlak', (data) => {
  console.log(data);
});

const add = (num1, num2, callback) => {
  setTimeout(() => {
    const result = num1 + num2;
    callback(result);
  }, 2000)
}
add(1,4, (sum) => {
  console.log(sum);
})


