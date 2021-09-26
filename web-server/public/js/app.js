fetch('http://localhost:3000/weather?address=yakima').then(function (response) {
    response.json().then(function (data) {
        try {
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    });
});
var weatherForm = document.querySelector('form');
weatherForm === null || weatherForm === void 0 ? void 0 : weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var search = document.querySelector('input');
    var messageOne = document.querySelector('#message-1');
    messageOne.textContent = 'From Javascript';
    var location = search.value;
    fetch("http://localhost:3000/weather?address=" + location).then(function (response) {
        response.json().then(function (data) {
            try {
                messageOne.textContent = "The current weather in " + data.location.query + " is " + data.data.current.temperature + " degrees";
            }
            catch (error) {
                console.log(error);
            }
        });
    });
});
