import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";
import { freemium } from "../services/freemium";
import { cookiesToObject } from "../components/cookies";

export const settings = () => {
  const cookies = cookiesToObject(document.cookie);
  const userId = parseInt(document.querySelector('body').dataset.userId);
  const init = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token
  };

  init.url = '/api/v1/mailchimp'
  mailchimp(init);

  init.url = '/api/v1/notification'
  notification(init);

  init.url = '/api/v1/freemium'
  freemium(init);
}
