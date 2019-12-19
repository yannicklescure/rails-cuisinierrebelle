import "bootstrap";
import { scrollToAnchor } from "../components/scroll-to-anchor";

scrollToAnchor("#recipes-cards");

const bannerCtaBox = document.querySelector('#banner-cta-box');
const bannerCtaBoxBtn = document.querySelector('#banner-cta-box-btn');
bannerCtaBoxBtn.style.width = `${bannerCtaBox.offsetWidth}px`;
