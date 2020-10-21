export const editReply = () => {
  const replies = document.querySelectorAll('.reply-content');
  replies.forEach(reply => {
    const editReplyId = document.querySelector(`#edit-reply-${reply.dataset.reply}`);
    if (editReplyId) {
      editReplyId.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(`#reply-${reply.dataset.reply}-content`).classList.add('d-none');
        document.querySelector(`#edit-reply-${reply.dataset.reply}-form`).classList.remove('d-none');
        document.querySelector(`#edit-reply-${reply.dataset.reply}-btn`).classList.remove('d-none');
        const spinners = document.querySelectorAll(`.spinner-reply-${reply.dataset.reply}`);
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
