export const setPictureSize = (picture) => {
  const device = document.querySelector('body').dataset.device;
  if (picture) {
    let pictureWidth = '';
    if (device === 'desktop' || device === 'tablet') {
      pictureWidth = picture.offsetWidth || 260
    } else {
      pictureWidth = window.innerWidth - 30;
    }
    let pictureHeight = `${parseInt(pictureWidth * 9 / 16)}`;
    if ((/url.*/).test(picture.style.backgroundImage)) {
      picture.style.width = `${pictureWidth}px`;
      picture.style.height = `${pictureHeight}px`;
    } else {
      picture.width = pictureWidth;
      picture.height = pictureHeight;
    }
    // console.log(picture);
    // console.log(device);
    // console.log(pictureWidth);
    // console.log(pictureHeight);
    // console.log((/url.*/).test(picture.style.backgroundImage));
  }
}
