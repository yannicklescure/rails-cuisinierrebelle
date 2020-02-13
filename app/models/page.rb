class Page < ApplicationRecord

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  validates :content, presence: true

  # include PgSearch::Model
  # multisearchable against: [:title, :content]
end
