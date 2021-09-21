const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=e61d54f37409906fc4a83d8b8e27ee76&query=yakima&units=f`;

const request = http.request(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    
    data = data + chunk.toString();
  });

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });

})

request.end();