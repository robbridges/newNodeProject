fetch('http://localhost:3000/weather?address=yakima').then((response) => {
  response.json().then((data) => {
    try {
    console.log(data);
    
    } catch (error) {
      console.log(error);
    }
  });
})

const weatherForm = document.querySelector('form');

weatherForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.querySelector('input');
  const messageOne = document.querySelector('#message-1');

  messageOne!.textContent= 'From Javascript';

  
  const location = search!.value
  

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    

    try {
    messageOne!.textContent = `The current weather in ${data.location.query} is ${data.data.current.temperature} degrees`;
    
    
    } catch (error) {
      console.log(error);
    }
  });
})
})