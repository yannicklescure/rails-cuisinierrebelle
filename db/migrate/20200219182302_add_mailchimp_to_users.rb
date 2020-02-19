class AddMailchimpToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :mailchimp, :boolean, default: false
  end
end
