if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('Service worker was registered');
    })
    .catch((error) => console.log('Service worker failed register', error));
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[app.js] beforeinstallprompt event was fired.');
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

const timer = (delay) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject('Error in timeout'), delay)
  );
};

timer(2000)
  .then(() => console.log('timer out'))
  .catch((error) => console.log(error));

fetch('https://httpbin.org/json')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

fetch('https://httpbin.org/post', {
  method: 'POST',
  body: JSON.stringify({ name: 'Andrey' }),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
