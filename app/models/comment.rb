class Comment < ApplicationRecord
  belongs_to :recipe
  belongs_to :user
  has_many :replies, dependent: :destroy

  validates :content, presence: true
end
