class Recipe < ApplicationRecord
  has_many :bookmarks

  extend FriendlyId
  friendly_id :title, use: :slugged
end
