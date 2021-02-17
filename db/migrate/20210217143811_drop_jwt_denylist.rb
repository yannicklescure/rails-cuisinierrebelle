class DropJwtDenylist < ActiveRecord::Migration[6.0]
  def change
    remove_index :jwt_denylist, :jti
    drop_table :jwt_denylist do |t|
      t.string :jti, null: false
      t.datetime :exp, null: false
    end
  end
end
