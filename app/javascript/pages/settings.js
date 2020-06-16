import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";
import { cookiesToObject } from "../components/cookies";

export const settings = () => {
  const cookies = cookiesToObject(document.cookie);
  const userId = parseInt(document.querySelector('body').dataset.userId);
  const initMailchimp = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    url: '/api/v1/mailchimp'
  };
  mailchimp(initMailchimp);
  const initNotification = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    url: '/api/v1/notification'
  };
  notification(initNotification);
}
