
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#info').value;
  // const nawadnianie = document.getElementById('systemNawadniania');

  const nawadnianie = document.querySelector('#systemNawadniania');
  const pielegnacja = document.querySelector('#pielegnacja');
  const zakladanie = document.querySelector('#zakladanie');
  const projekt= document.querySelector('#projektOgrodu');
  const isNawadnianieChecked = nawadnianie.checked;
  const isPielegnacjaChecked = pielegnacja.checked;
  const isZakladanieChecked = zakladanie.checked;
  const isProjektChecked = projekt.checked;
  const data = {
    email: email,
    message: message,
    nawadnianie: isNawadnianieChecked,
    pielegnacja: isPielegnacjaChecked,
    zakladanie: isZakladanieChecked,
    projekt: isProjektChecked,
  }

  // console.log(formData);
  fetch(`http://127.0.0.1:3000/form`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response =>{
    console.log('Wiadomość została wysłana');
    // return response.json();
  }).catch(error =>{
    console.error('Wystąpił błąd', error);
  });

});