class Reply < ApplicationRecord
  belongs_to :user
  belongs_to :comment
  has_many :reply_likes, dependent: :destroy

  validates :content, presence: true
end
