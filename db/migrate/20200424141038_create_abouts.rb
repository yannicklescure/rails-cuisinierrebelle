class CreateAbouts < ActiveRecord::Migration[6.0]
  def change
    create_table :abouts do |t|
      t.text :content
      t.string :facebook
      t.string :instagram
      t.string :twitter
      t.string :youtube
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
