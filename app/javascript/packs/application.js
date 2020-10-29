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

require('data-confirm-modal')

jQuery.htmlPrefilter = function( html ) {
  return html;
};

import 'jquery'
import '../src/plugins'
// import '../src/fonts'
import '../stylesheets/application'

// import '../vanillaJS'

import { flashes } from "../vanillaJS/components/flashes";

const notice = document.querySelector('.notice');
if(notice != null) {
  // const { flashes } = await import("../vanillaJS/components/flashes");
  flashes();
  $('[data-toggle="tooltip"]').tooltip();
}
