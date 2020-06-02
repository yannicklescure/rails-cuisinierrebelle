class Comment < ApplicationRecord
  belongs_to :recipe
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_many :comment_likes, dependent: :destroy

  mount_uploader :photo, CommentPhotoUploader

  validates :content, presence: true
end
