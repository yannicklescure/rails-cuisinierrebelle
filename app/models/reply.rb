class Reply < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :comment, touch: true
  has_many :reply_likes, dependent: :destroy

  mount_uploader :photo, CommentPhotoUploader

  validates :content, presence: true

  after_save :create_json_cache

  private

  def create_json_cache
    CreateRecipesJsonCacheJob.perform_later
  end
end
