class MailchimpSubscribeUser < ApplicationJob
  queue_as :default

  def perform(user)
    list_id = ENV['MAILCHIMP_LIST_ID']
    puts "Subscribe #{user.name} to mailchimp"
    gibbon = Gibbon::Request.new
    lower_case_md5_hashed_email_address = Digest::MD5.hexdigest(user.email.downcase)
    user_mailchimp_subscribed = true
    begin
      gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).retrieve
    rescue Gibbon::MailChimpError => e
      puts "Houston, we have a problem: #{e.message} - #{e.raw_body}"
      user_mailchimp_subscribed = false
    end
    if user_mailchimp_subscribed
      gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).upsert(body: {email_address: user.email, status: "subscribed", merge_fields: {FNAME: user.first_name, LNAME: user.last_name}})
    else
      gibbon.lists(list_id).members.create(body: {email_address: user.email, status: "subscribed", merge_fields: {FNAME: user.first_name, LNAME: user.last_name}})
    end
    puts "OK I'm done now"
    return true
  end
end
