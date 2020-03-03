export const notification = (init) => {
  // notification({url: 'api/v1/notification', user_id: userId});
  const btnSwitches = document.querySelectorAll('.notification-switch');
  console.log(init);
  btnSwitches.forEach((btnSwitch) => {
    btnSwitch.addEventListener('change', (event)=> {
      console.log(event.target.checked);
      const options = {
        method: 'PUT',
        // credentials: 'same-origin',
        headers: {
          'X-User-Email': atob(decodeURIComponent(init.user_email)),
          'X-User-Token': atob(decodeURIComponent(init.user_token))
        }
      };

      fetch(`${init.url}/${init.user_id}?notification=${event.target.checked}`, options)
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
