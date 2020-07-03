class AddFreemiumToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :freemium, :boolean, default: false
  end
end
