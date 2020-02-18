require 'digest'

class MailchimpUnsubscribeUser < ApplicationJob
  queue_as :default

  def perform(user)
    puts "Adding #{user.name} to mailchimp"
    list_id = ENV['MAILCHIMP_LIST_ID']
    gibbon = Gibbon::Request.new
    lower_case_md5_hashed_email_address = Digest::MD5.hexdigest(user.email.downcase)
    gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).update(body: { status: "unsubscribed" })
    puts "OK I'm done now"
  end
end
