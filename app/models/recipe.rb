class Recipe < ApplicationRecord
  belongs_to :user
  has_many :bookmarks, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_one_attached :photo
  mount_uploader :photo, PhotoUploader

  acts_as_taggable_on :tags

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  validates :subtitle, presence: true
  validates :description, presence: true
  validates :direction, presence: true
end
