class AddDeviceToSearches < ActiveRecord::Migration[6.0]
  def change
    add_column :searches, :device, :string
  end
end
