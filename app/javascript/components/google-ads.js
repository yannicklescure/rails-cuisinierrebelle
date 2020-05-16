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
  const navbarElements = document.querySelector('#navbarSupportedContent').firstElementChild.childNodes;
  navbarElements.forEach(navbarElement => {
    if (navbarElement.className === 'google-auto-placed') navbarElement.remove();
  });
}
