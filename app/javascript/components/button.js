export const btnClick = () => {
  const buttons = document.querySelectorAll('input[type="submit"]');
  // console.log('btnClick');
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
          let newEl = document.createElement('button');
          if (commentID) {
            const commentSpinners = document.querySelectorAll(`.spinner-comment-${commentID}`);
            if (commentSpinners) {
              commentSpinners.forEach(commentSpinner => {
                commentSpinner.parentNode.removeChild(commentSpinner);
              });
            }
            newEl.setAttribute('class', `btn btn-light spinner-comment-${commentID}`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
          } else if (replyID) {
            const replySpinners = document.querySelectorAll(`.spinner-reply-${replyID}`);
            if (replySpinners) {
              replySpinners.forEach(replySpinner => {
                replySpinner.parentNode.removeChild(replySpinner);
              });
            }
            newEl.setAttribute('class', `btn btn-light spinner-reply-${replyID}`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
          } else {
            newEl.setAttribute('class', `btn btn-light`);
            newEl.disabled = true;
            newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
          }
          // el.replaceWith(newEl);
          el.classList.add('d-none');
          el.insertAdjacentElement('afterEnd', newEl);
        }
      });
    });
  });
}
