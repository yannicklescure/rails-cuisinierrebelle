export const setPictureSize = (picture) => {
  const device = document.querySelector('body').dataset.device;
  if (picture) {
    // console.log(picture);
    let pictureWidth = picture.offsetWidth || 260;
    if (device === 'smartphone') pictureWidth = window.innerWidth - 30;
    // console.log(pictureWidth);
    let pictureHeight = `${parseInt(pictureWidth * 9 / 16)}`;
    // console.log(pictureHeight);
    // console.log(device);
    // console.log((/url.*/).test(picture.style.backgroundImage))
    if ((/url.*/).test(picture.style.backgroundImage)) {
      picture.style.width = `${pictureWidth}px`;
      picture.style.height = `${pictureHeight}px`;
    } else {
      picture.width = pictureWidth;
      picture.height = pictureHeight;
    }
  }
}
