//
// This is optional (in case you have `I18n is not defined` error)
// If you want to put this line, you must put it BEFORE `i18n/translations`
//= require i18n
// Some people even need to add the extension to make it work, see https://github.com/fnando/i18n-js/issues/283
//= require i18n.js
//
// This is a must
//= require i18n/translations

// import Rails from '@rails/ujs'
require('@rails/ujs').start()
// require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import '../serviceworker-companion'

// require('data-confirm-modal')

import 'jquery'
import '../src/plugins'

jQuery.htmlPrefilter = function( html ) {
  return html;
};

// import '../src/fonts'
//require webfontloader
// const WebFont = require('webfontloader');
// // @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&family=Roboto:wght@300;400;700&display=swap');
// // @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

// WebFont.load({
//   google: {
//     families: ['Raleway:300,400,700', 'Roboto:300,400,700', 'Material Icons']
//   }
// });

// import '../stylesheets/application.scss'

// import '../vanillaJS'

// import { flashes } from "../vanillaJS/components/flashes";

// const notice = document.querySelector('.notice');
// if(notice != null) {
//   // const { flashes } = await import("../vanillaJS/components/flashes");
//   flashes();
// }
// $('[data-toggle="tooltip"]').tooltip();
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

if (!(/localhost|127\.0\.0\.1/).test(document.domain)) console.log = function() {}

if ((/.*cuisinierrebelle\.com/).test(document.domain)) {
  document.domain = "cuisinierrebelle.com";
}
console.log(document.domain);
console.log(window.location.hostname);

// import '../stylesheets/critical.scss'
// const stylesheetsApp = () => import('../stylesheets/application.scss');

// document.addEventListener('DOMContentLoaded', async () => {
//   await stylesheetsApp()
// })

import '../packs/vue'
