class ChangeLocaleDefaultInUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :locale
    add_column :users, :locale, :string, null: false, default: :fr
  end
end
