class AddCheckedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :checked, :boolean
  end
end
