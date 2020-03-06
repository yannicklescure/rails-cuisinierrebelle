class ApplicationMailer < ActionMailer::Base
  default from: 'contact@cuisinierrebelle.com'
  # layout 'mailer'
  layout 'bootstrap-mailer'
end
