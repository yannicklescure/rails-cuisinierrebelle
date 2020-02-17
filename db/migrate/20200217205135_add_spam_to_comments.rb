class AddSpamToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :spam, :boolean, default: false
  end
end
