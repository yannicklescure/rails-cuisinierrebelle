class Page < ApplicationRecord

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  validates :content, presence: true

  # include PgSearch::Model
  # multisearchable against: [:title, :content]
  after_save :create_json_cache

  private

  def create_json_cache
    CreateRecipesJsonCacheJob.perform_later
  end
end
