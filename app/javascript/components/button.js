export const btnClick = () => {
  const btn = document.querySelector('input[type="submit"]');
  btn.addEventListener('click', (event) => {
    // console.log(event.currentTarget);
    const el = event.currentTarget;
    const form = el.closest('form');
    form.addEventListener('submit', (event) => {
      // event.preventDefault();
      const newEl = document.createElement('button');
      newEl.setAttribute('class', 'btn btn-secondary');
      newEl.disabled = true;
      newEl.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>`;
      el.replaceWith(newEl);
    });
  });
}
