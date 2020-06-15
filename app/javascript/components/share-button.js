export const shareButton = (init) => {

  const shareBtn = document.querySelector('#share-btn');
  if(shareBtn) {
    let url = document.location.href;
    const canonicalElement = document.querySelector('link[rel=canonical]');
    if (canonicalElement !== null) {
        url = canonicalElement.href;
    }
    const shareData = {
      // title: 'MDN',
      // text: 'Learn web development on MDN!',
      url: url,
    }

    // Must be triggered some kind of "user activation"
    shareBtn.addEventListener('click', async () => {
      try {
        await navigator.share(shareData)
      } catch(e) {
        console.log('Error: ' + e);
      }
      console.log('MDN shared successfully');
    });
  }
}
