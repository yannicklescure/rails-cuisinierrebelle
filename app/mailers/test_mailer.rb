class TestMailer < ActionMailer::Base
  def hello
    mail(
      subject: 'Hello from Postmark',
      to: 'contact@cuisinierrebelle.com',
      from: 'contact@cuisinierrebelle.com',
      html_body: '<strong>Hello</strong> dear Postmark user.',
      track_opens: 'true'
    )
  end
end
