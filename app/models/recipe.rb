class Recipe < ApplicationRecord
  belongs_to :user
  has_many :bookmarks, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  mount_uploader :photo, PhotoUploader

  acts_as_taggable_on :tags

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  validates :subtitle, presence: true
  validates :description, presence: true
  validates :direction, presence: true
  validates :photo, presence: true
  validates :video, format: {
    with: /(^$|^.*@.*\..*$)|youtu.?be/,
    message: I18n.t(".only_allows_youtube_video")
  }

  include PgSearch::Model
  # PgSearch.multisearch_options = {
  #   using: {
  #     tsearch: { prefix: true }
  #   }
  #   # using: [:tsearch, :trigram],
  #   # ignoring: :accents
  # }
  multisearchable against: [:title, :description, :direction]
  # pg_search_scope :search_by_query,
  #                 against: [:title, :description, :direction],
  #                 using: {
  #                   tsearch: { prefix: true }
  #                 }
end
