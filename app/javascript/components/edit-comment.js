export const editComment = () => {
  const comments = document.querySelectorAll('.comment');
  comments.forEach(comment => {
    const editCommentId = document.querySelector(`#edit-comment-${comment.dataset.comment}`);
    if (editCommentId) {
      editCommentId.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(`#comment-${comment.dataset.comment}-content`).classList.add('d-none');
        document.querySelector(`#edit-comment-${comment.dataset.comment}-form`).classList.remove('d-none');
      });
    }
  });
}
