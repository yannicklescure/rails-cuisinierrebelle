const selectInput = (replyId) => {
  if (!replyId) replyId = '';
  const input = document.getElementById(`reply-photo-input-${replyId}`);
  // we add a listener to know when a new picture is uploaded
  if (input) {
    input.addEventListener('change', () => {
      // console.log(input);
      // we call the displayPreview function (who retrieve the image url and display it)
      displayPreview(input, replyId);
    });
  }
}

const displayPreview = (input, replyId) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById(`reply-photo-preview-${replyId}`).src = event.currentTarget.result;
    }
    reader.readAsDataURL(input.files[0])
    const photoActive = document.getElementById(`reply-photo-active-${replyId}`);
    if(photoActive) photoActive.classList.add('d-none');
    document.getElementById(`reply-photo-preview-${replyId}`).classList.remove('d-none');
  }
}

export const previewReplyPhotoOnFileSelect = () => {
  selectInput();
  const replies = document.querySelectorAll('.reply');
  // console.log(replies);
  replies.forEach(reply => {
    // we select the photo input
    const replyId = reply.dataset.reply
    if (replyId) {
      // console.log(reply);
      selectInput(reply.dataset.reply);
    }
  });
}
