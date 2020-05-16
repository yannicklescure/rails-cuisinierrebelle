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

const removeTargetNodeAds = (targetNode) => {
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationsList, observer) => {
      // Use traditional 'for loops' for IE 11
      for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
              // console.log('A child node has been added or removed.');
              // console.log(targetNode.firstElementChild.childNodes);
              targetNode.firstElementChild.childNodes.forEach(childNode => {
                if (childNode.className === 'google-auto-placed') childNode.classList.add('d-none'); //childNode.remove();
              });
              observer.disconnect();
          }
          else if (mutation.type === 'attributes') {
              // console.log('The ' + mutation.attributeName + ' attribute was modified.');
          }
      }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  // observer.disconnect();
};

// KILL Ads in navbar
// class google-auto-placed
export const googleAdsNoNavbar = () => {
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  // Select the node that will be observed for mutations
  const device = document.querySelector('body').dataset.device;
  // console.log(device);

  let targetNodeIds = [];
  if (device === 'desktop') targetNodeIds = ['navbarSupportedContent'];
  else targetNodeIds = ['recipe-user'];

  targetNodeIds.forEach((targetNodeId) => {
    const targetNode = document.getElementById(targetNodeId);
    removeTargetNodeAds(targetNode);
  });

  // const targetNodes = document.querySelector('#navbarSupportedContent').firstElementChild.childNodes;
  // targetNodes.forEach(targetNode => {
  //   if (targetNode.className === 'google-auto-placed') targetNode.remove();
  // });
}
