export const flashes = () => {
  console.log('close');
  setTimeout(() => {
    const target = document.querySelector('.close');
    target.addEventListener('click',() => {
      const alert = $('.alert');
      alert.hide();
    });
    target.click();
  }, 1500);
}
