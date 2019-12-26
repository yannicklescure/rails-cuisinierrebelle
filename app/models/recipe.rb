class Recipe < ApplicationRecord
  belongs_to :user
  has_many :bookmarks
  has_many :like

  extend FriendlyId
  friendly_id :title, use: :slugged
end
