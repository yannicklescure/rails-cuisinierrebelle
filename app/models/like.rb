class Like < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :recipe, touch: true

  after_save :create_json_cache

  private

  def create_json_cache
    CreateRecipesJsonCacheJob.perform_later
  end
end
