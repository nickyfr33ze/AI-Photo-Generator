import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner();
    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });
});

    if(response.ok){ // if the response is successful (200 code), show the image
    const { image } = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
    hideSpinner();
    }
    else { // if the response is unsuccessful, show the error to the end user
      const err = await response.text();
      alert(err);
      console.error(err);
    }

function showSpinner(){
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming...<span class=spinner>🧠</span>';
}

function hideSpinner(){
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}