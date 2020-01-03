class Recipe < ApplicationRecord
  belongs_to :user
  has_many :bookmarks
  has_many :likes

  has_one_attached :photo

  extend FriendlyId
  friendly_id :title, use: :slugged
end
