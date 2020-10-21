export const recipePhoto = () => {
  const recipePhotoButtons = document.querySelectorAll('.recipe-photo-btn');
  // console.log(recipePhotoButton);
  recipePhotoButtons.forEach(recipePhotoButton => {
    recipePhotoButton.style.cursor = 'pointer';
    recipePhotoButton.addEventListener('click', event => {
      document.querySelector(`#photo-input`).click();
    });
  });
}
