const fs = require('fs');

// const book = {
//   title: 'Harry Potter',
//   author: 'JK rowling.',
// }
// // turn the object to JSON
// const bookJson =JSON.stringify(book);
// // Turn it back to JS object
// const regularObject =JSON.parse(bookJson);

// fs.writeFileSync('1-json.json', bookJson)

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();

// const data = JSON.parse(dataJSON);

// console.log(data.author);

const JSONdata = fs.readFileSync('1-json.json');
const objectData = JSON.parse(JSONdata);

objectData.name = "Rob"
objectData.age = "33"
const newJSONData = JSON.stringify(objectData);
fs.writeFileSync('1-json.json', newJSONData);




