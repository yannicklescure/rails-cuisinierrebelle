export const editComment = () => {
  const comments = document.querySelectorAll('.comment');
  // console.log(comments);
  comments.forEach(comment => {
    const EditCommentIdButton = document.querySelector(`#edit-comment-${comment.dataset.comment}`);
    if (EditCommentIdButton) {
      EditCommentIdButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(`#comment-${comment.dataset.comment}-content`).classList.add('d-none');
        document.querySelector(`#edit-comment-${comment.dataset.comment}-form`).classList.remove('d-none');
        document.querySelector(`#edit-comment-${comment.dataset.comment}-btn`).classList.remove('d-none');
        const spinners = document.querySelectorAll(`.spinner-comment-${comment.dataset.comment}`);
        if (spinners) {
          // console.log(spinners);
          spinners.forEach(spinner => {
            spinner.parentNode.removeChild(spinner);
          });
        }
      });
    }
  });
}
