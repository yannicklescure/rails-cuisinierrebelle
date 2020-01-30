import { card } from "./card";
import { cookiesToObject } from "./cookies";

export const lazyLoad = (url,userSignedIn) => {

  // GET https://secure.example.com?user_email=alice@example.com&user_token=1G8_s7P-V-4MGojaKD7a
  const cookies = cookiesToObject(document.cookie);
  console.log(cookies);
  let options;
  if(userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(cookies.user_email)),
        'X-User-Token': atob(decodeURIComponent(cookies.user_token))
      }
    };
    console.log(`headers ${JSON.stringify(options)}`);
  } else {
    options = {};
  }

  fetch(url, { options })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    card(result.data);
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}
