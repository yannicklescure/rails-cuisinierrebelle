class Comment < ApplicationRecord
  belongs_to :recipe, touch: true
  belongs_to :user, touch: true
  has_many :replies, dependent: :destroy
  has_many :comment_likes, dependent: :destroy

  mount_uploader :photo, CommentPhotoUploader

  validates :content, presence: true

  after_save :create_json_cache

  private

  def create_json_cache
    CreateRecipesJsonCacheJob.perform_later
  end
end
