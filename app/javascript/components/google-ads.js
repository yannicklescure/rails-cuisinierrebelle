export const googleAdsNoPrint = () => {
  const googleAutoPlacedAds = document.querySelectorAll('.google-auto-placed');
  if (googleAutoPlacedAds) {
    googleAutoPlacedAds.forEach(googleAutoPlacedAd => {
      googleAutoPlacedAd.classList.add('d-print-none');
    });
  } else {
    console.log('no ads');
  }
}

// KILL Ads in navbar
// class google-auto-placed
export const googleAdsNoNavbar = () => {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('navbarSupportedContent');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
              console.log('A child node has been added or removed.');
          }
          else if (mutation.type === 'attributes') {
              console.log('The ' + mutation.attributeName + ' attribute was modified.');
          }
      }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  observer.disconnect();

  // const navbarElements = document.querySelector('#navbarSupportedContent').firstElementChild.childNodes;
  // navbarElements.forEach(navbarElement => {
  //   if (navbarElement.className === 'google-auto-placed') navbarElement.remove();
  // });
}
