class AddSpamToReplies < ActiveRecord::Migration[5.2]
  def change
    add_column :replies, :spam, :boolean, default: false
  end
end
