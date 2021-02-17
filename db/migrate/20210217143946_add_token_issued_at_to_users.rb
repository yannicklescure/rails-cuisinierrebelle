class AddTokenIssuedAtToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :token_issued_at, :datetime
  end
end
