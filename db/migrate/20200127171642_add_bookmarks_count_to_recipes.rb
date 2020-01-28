class AddBookmarksCountToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :bookmarks_count, :integer, default: 0
  end
end
