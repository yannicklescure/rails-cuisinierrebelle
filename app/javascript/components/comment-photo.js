export const CommentPhoto = () => {
  const CommentPhotoButtons = document.querySelectorAll('.comment-photo-btn');
  CommentPhotoButtons.forEach(CommentPhotoButton => {
    // console.log(CommentPhotoButton.dataset.comment);
    CommentPhotoButton.addEventListener('click', event => {
      const CommentId = event.currentTarget.dataset.comment || '';
      document.querySelector(`#comment-photo-input-${CommentId}`).click();
    });
  });
}
