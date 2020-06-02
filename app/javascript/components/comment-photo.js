export const CommentPhoto = () => {
  const CommentPhotoButtons = document.querySelectorAll('.comment-photo-btn');
  CommentPhotoButtons.forEach(CommentPhotoButton => {
    // console.log(CommentPhotoButton.dataset.comment);
    CommentPhotoButton.addEventListener('click', event => {
      const commentId = event.currentTarget.dataset.comment;
      if (!commentId) commentId = '';
      document.querySelector(`#comment-photo-input-${commentId}`).click();
    });
  });
}
