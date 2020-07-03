const fade = (element) => {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

const unfade = (element) => {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 10);
}

const triggerClick = (element) => {
  const target = document.querySelector(element.close);
  const alert = document.querySelector(element.alert);
  target.addEventListener('click',(event) => {
    event.preventDefault();
    fade(alert);
  });
  target.click();
}

const alertJQ = () => {
  // const alertJQ = $('.alert');
  // alertJQ.hide();
  document.querySelector('.alert').style.display = 'none';
};

export const flashes = () => {

  document.addEventListener('DOMContentLoaded', (event) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        document.querySelector('.alert').style.display = 'block';
        triggerClick({close: '.close', alert: '.alert'}, alertJQ);
      }, 1500);
    }).then((result) => {
      alertJQ();
    })
  });
}
