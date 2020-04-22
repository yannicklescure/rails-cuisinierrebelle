export const googleAdsNoPrint = () => {
  const googleAutoPlacedAds = document.querySelectorAll('.google-auto-placed');
  if (googleAutoPlacedAds) {
    googleAutoPlacedAds.forEach(googleAutoPlacedAd => {
      console.log('no print');
      googleAutoPlacedAd.classList.add('d-print-none');
    });
  } else {
    console.log('no ads');
  }
}
