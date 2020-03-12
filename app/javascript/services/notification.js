export const notification = (init) => {
  const btnSwitches = document.querySelectorAll('.notification-switch');
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
