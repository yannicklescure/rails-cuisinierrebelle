import { card } from "./card";

export const lazyLoad = (init) => {

  // GET https://secure.example.com?user_email=alice@example.com&user_token=1G8_s7P-V-4MGojaKD7a
  let options;
  if(init.userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(init.user_email)),
        'X-User-Token': atob(decodeURIComponent(init.user_token))
      }
    };
  } else {
    options = {};
  }

  fetch(init.url, options)
  .then(response => response.json())
  .then(result => {
    card(init, result.data);
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}
