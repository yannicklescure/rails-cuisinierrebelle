class RecipeLog < ApplicationRecord
  belongs_to :recipe, touch: true
end
