export const replyForms = () => {
  const replyForms = document.querySelectorAll('.no-reply');
  replyForms.forEach((replyForm) => {
    replyForm.addEventListener('click', event => {
      const currentForm = document.querySelector(`#reply-form-${event.currentTarget.dataset.comment}`);
      currentForm.classList.toggle('d-none');
    });
  });
}

export const viewReplies = () => {
  let viewReplies = false;
  const replies = document.querySelectorAll('.reply');
  replies.forEach((reply) => {
    reply.addEventListener('click', event => {
      const repliesList = document.querySelector(`#replies-list-${event.currentTarget.dataset.comment}`);
      repliesList.classList.toggle('d-none');
      viewReplies === false ? viewReplies = true : viewReplies = false;
      const arrowState = document.querySelector(`#replies-list-arrow-${event.currentTarget.dataset.comment}`);
      if(viewReplies) arrowState.innerHTML = `<i class="material-icons md-16">keyboard_arrow_up</i>`;
      else arrowState.innerHTML = `<i class="material-icons md-16">keyboard_arrow_down</i>`;
    });
  });
}

export const repliesReply = () => {
  const repliesReply = document.querySelectorAll('.reply-reply');
  repliesReply.forEach((reply) => {
    reply.addEventListener('click', event => {
      const replyForm = document.querySelector(`#reply-reply-form-${event.currentTarget.dataset.comment}`);
      replyForm.classList.toggle('d-none');
    });
  });
}
