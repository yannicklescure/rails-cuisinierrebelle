class TestMailer < ActionMailer::Base
  def hello
    mail(
      subject: 'Hello from Postmark',
      to: 'contact@yannicklescure.com',
      from: 'contact@yannicklescure.com',
      html_body: '<strong>Hello</strong> dear Postmark user.',
      track_opens: 'true'
    )
  end
end
