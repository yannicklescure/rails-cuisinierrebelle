class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title
      t.string :description
      t.string :url
      t.string :photo

      t.timestamps
    end
  end
end
