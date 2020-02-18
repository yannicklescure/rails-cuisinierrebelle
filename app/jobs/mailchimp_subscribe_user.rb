class MailchimpSubscribeUser < ApplicationJob
  queue_as :default

  def perform(user)
    puts "Adding #{user.name} to mailchimp"
    list_id = ENV['MAILCHIMP_LIST_ID']
    gibbon = Gibbon::Request.new
    lower_case_md5_hashed_email_address = Digest::MD5.hexdigest(user.email.downcase)
    puts gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).retrieve
    if gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).retrieve
      gibbon.lists(list_id).members(lower_case_md5_hashed_email_address).upsert(body: {email_address: user.email, status: "subscribed", merge_fields: {FNAME: user.first_name, LNAME: user.last_name}})
    else
      gibbon.lists(list_id).members.create(body: {email_address: user.email, status: "subscribed", merge_fields: {FNAME: user.first_name, LNAME: user.last_name}})
    end
    puts "OK I'm done now"
  end
end
