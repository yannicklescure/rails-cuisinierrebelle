class Like < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :recipe, touch: true
end
