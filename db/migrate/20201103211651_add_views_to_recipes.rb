class AddViewsToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :views, :integer, default: 0
  end
end
