class AddLocaleToPages < ActiveRecord::Migration[6.0]
  def change
    add_column :pages, :locale, :string, default: :fr
  end
end
