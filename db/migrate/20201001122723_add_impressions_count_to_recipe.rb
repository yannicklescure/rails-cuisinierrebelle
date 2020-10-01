class AddImpressionsCountToRecipe < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :impressions_count, :int
  end
end
