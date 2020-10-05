if (navigator.serviceWorker) {
  // console.log('[serviceWorker] Hello');
  navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
    .then(function(reg) {
      console.log('[Companion]', 'Service worker registered!');
    })
    .catch((error) => {
        console.log('Service Worker failed to register');
        console.log(error);
    });
}
