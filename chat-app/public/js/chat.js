
const socket = io();

// Frequent elements below.

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;



socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html);
})

socket.on('locationMessage', (url) => {
  console.log(url);
  const html = Mustache.render(locationMessageTemplate, {
    url
  });
  $messages.insertAdjacentHTML('beforeend', html);
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // users shouldn't be able to send another message until the prior message completes.
  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.userMessage.value;

  socket.emit('sendMessage', message, (error) => {
    // we need to re-enable our button after the very brief disable while the message was sending, also reset the value and focus again on the input box
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value= "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }

    console.log('The message was delivered!!');
  })
})


$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }
  
  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, () => {
      console.log('Location shared');
      $sendLocationButton.removeAttribute('disabled');
    })
  })

})
