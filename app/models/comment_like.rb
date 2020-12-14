class CommentLike < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :comment, touch: true

  after_save :create_json_cache

  private

  def create_json_cache
    CreateUsersJsonCacheJob.perform_later
  end
end
