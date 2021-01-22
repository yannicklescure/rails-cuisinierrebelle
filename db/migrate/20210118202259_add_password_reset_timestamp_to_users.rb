class AddPasswordResetTimestampToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :password_reset_timestamp, :string, default: 0
  end
end

