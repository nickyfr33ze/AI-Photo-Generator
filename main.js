import './style.css'; // import the CSS file

const form = document.querySelector('form'); // get the form element

form.addEventListener('submit', async (e) => { // listen for the form to be submitted
    e.preventDefault(); // prevent the form from submitting
    showSpinner(); // show the spinner to the end user
    const data = new FormData(form); // create a new FormData object from the form

    const response = await fetch('http://localhost:8080/dream', { // send a request to the server
      method: 'POST', // send a POST request
      headers: { // set the headers to JSON
        'Content-Type': 'application/json', // set the content type header to JSON
      },
      body: JSON.stringify({ // stringify the form data
        prompt: data.get('prompt'), // get the prompt from the form data
      }),
    });
});

    if(response.ok){ // if the response is successful (200 code), show the image
    const { image } = await response.json(); // get the image from the response

    const result = document.querySelector('#result'); // get the result element
    result.innerHTML = `<img src="${image}" width="512" />`; // set the image as the innerHTML of the result element
    hideSpinner(); // hide the spinner
    }
    else { // if the response is unsuccessful, show the error to the end user
      const err = await response.text(); // get the error message from the response
      alert(err); // show the error to the end user
      console.error(err); // log the error to the console
    }

function showSpinner(){ // show the spinner to the end user
  const button = document.querySelector('button'); // get the button element
  button.disabled = true; // disable the button
  button.innerHTML = 'Dreaming...<span class=spinner>🧠</span>'; // set the button's innerHTML to the spinner
}

function hideSpinner(){ // hide the spinner from the end user
  const button = document.querySelector('button'); // get the button element
  button.disabled = false; // enable the button
  button.innerHTML = 'Dream'; // set the button's innerHTML to the original text
}