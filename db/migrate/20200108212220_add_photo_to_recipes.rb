class AddPhotoToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :photo, :string
  end
end
