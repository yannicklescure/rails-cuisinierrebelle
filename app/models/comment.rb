class Comment < ApplicationRecord
  belongs_to :recipe
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_many :comment_likes, dependent: :destroy

  validates :content, presence: true
end
