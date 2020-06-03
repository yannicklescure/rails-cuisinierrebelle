export const replyPhoto = () => {
  const replyPhotoButtons = document.querySelectorAll('.reply-photo-btn');
  replyPhotoButtons.forEach(replyPhotoButton => {
    // console.log(replyPhotoButton.dataset.reply);
    replyPhotoButton.addEventListener('click', event => {
      let replyId = event.currentTarget.dataset.reply;
      if (!replyId) replyId = '';
      document.querySelector(`#reply-photo-input-${replyId}`).click();
    });
  });
}
