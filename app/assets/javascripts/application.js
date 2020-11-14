//= require serviceworker-companion

if ((/localhost/).test(document.domain)) document.domain = "localhost";
else console.log = function() {}

if ((/.*cuisinierrebelle\.com/).test(document.domain)) {
  document.domain = "cuisinierrebelle.com";
}
console.log(document.domain);
console.log(window.location.hostname);
