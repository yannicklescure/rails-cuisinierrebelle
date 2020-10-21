export const alerts = () => {
  const alertBox = document.querySelector('#tools-alert');
  const alertBtn = document.querySelector('#tools-alert-btn');
  alertBtn.addEventListener('click', () => {
    console.log('alerts');
    alertBox.remove();
  });
}
