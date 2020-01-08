class Recipe < ApplicationRecord
  belongs_to :user
  has_many :bookmarks, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_one_attached :photo

  acts_as_taggable_on :tags

  extend FriendlyId
  friendly_id :title, use: :slugged
end
