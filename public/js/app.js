const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {

      event.preventDefault(); //prevent the reload of window browser just the event is completed

      const searchValue = search.value;

      messageOne.textContent = 'Loading...';

      messageTwo.textContent = '';

      fetch(`/weather?address=${searchValue}`).then((response) => {
        response.json().then((data) => {
          if(data.error) {
            return messageOne.textContent = data.error;
          }

          messageOne.textContent = data.location;

          messageTwo.textContent = data.forecast;
        });
      });
});
