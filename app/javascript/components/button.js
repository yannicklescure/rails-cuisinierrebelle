export const btnClick = () => {
  const buttons = document.querySelectorAll('input[type="submit"]');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      // console.log(event.currentTarget);
      const el = event.currentTarget;
      const form = el.closest('form');
      form.addEventListener('submit', (event) => {
        // event.preventDefault();
        if (el.parentElement) {
          // console.log('spin');
          // console.log(el.parentElement.parentElement);
          const commentID = el.parentElement.dataset.comment;
          // console.log(commentID);
          const replyID = el.parentElement.dataset.reply;
          // console.log(replyID);
          if (commentID) {
            const newEl = document.createElement('button');
            newEl.setAttribute('class', `btn btn-secondary spinner-comment-${commentID}`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
            el.replaceWith(newEl);
          } else if (replyID) {
            const newEl = document.createElement('button');
            newEl.setAttribute('class', `btn btn-secondary spinner-reply-${replyID}`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
            el.replaceWith(newEl);
          } else {
            const newEl = document.createElement('button');
            newEl.setAttribute('class', `btn btn-secondary`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
            el.replaceWith(newEl);
          }
        }
      });
    });
  });
}
