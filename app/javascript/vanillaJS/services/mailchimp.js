import { cookiesToObject } from "../components/cookies";

export const mailchimp = () => {
  const cookies = cookiesToObject(document.cookie);
  const userId = parseInt(document.querySelector('body').dataset.userId);

  const init = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    url: '/api/v1/mailchimp'
  };
  // console.log(init);

  const btnSwitches = document.querySelectorAll('.mailchimp-switch');
  btnSwitches.forEach((btnSwitch) => {
    btnSwitch.addEventListener('change', (event)=> {
      const options = {
        method: 'PUT',
        // credentials: 'same-origin',
        headers: {
          'X-User-Email': atob(decodeURIComponent(init.user_email)),
          'X-User-Token': atob(decodeURIComponent(init.user_token))
        }
      };
      fetch(`${init.url}/${init.user_id}?user_subscription=${event.target.checked}`, options)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
      })
      .catch(ex => {
        // console.log('parsing failed', ex);
      });
    });
  })
}
