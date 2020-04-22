export const googleAdsNoPrint = () => {
  const googleAutoPlacedAds = document.querySelectorAll('.google-auto-placed');
  if (googleAutoPlacedAds) {
    googleAutoPlacedAds.forEach(googleAutoPlacedAd => {
      googleAutoPlacedAd.classList.add('d-print-none');
    });
  }
}
