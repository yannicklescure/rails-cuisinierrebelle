const selectInput = (commentId) => {
  if (!commentId) commentId = '';
  const input = document.getElementById(`comment-photo-input-${commentId}`);
  console.log(input);
  // we add a listener to know when a new picture is uploaded
  input.addEventListener('change', () => {
    // we call the displayPreview function (who retrieve the image url and display it)
    displayPreview(input, commentId);
  })
}

const displayPreview = (input, commentId) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById(`comment-photo-preview-${commentId}`).src = event.currentTarget.result;
    }
    reader.readAsDataURL(input.files[0])
    const photoActive = document.getElementById(`comment-photo-active-${commentId}`);
    if(photoActive) photoActive.classList.add('d-none');
    document.getElementById(`comment-photo-preview-${commentId}`).classList.remove('d-none');
  }
}

export const previewCommentPhotoOnFileSelect = () => {
  selectInput();
  const comments = document.querySelectorAll('.comment');
  // console.log(comments);
  comments.forEach(comment => {
    // we select the photo input
    const commentId = comment.dataset.comment
    if (commentId) {
      selectInput(comment.dataset.comment);
    }
  });
}
