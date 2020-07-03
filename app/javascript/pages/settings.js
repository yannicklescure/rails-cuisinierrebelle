import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";
import { freemium } from "../services/freemium";
import { cookiesToObject } from "../components/cookies";

export const settings = () => {
  mailchimp();
  notification();
  freemium();
}
