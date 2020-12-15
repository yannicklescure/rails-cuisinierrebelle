class Page < ApplicationRecord

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  validates :content, presence: true

  def self.cache_key(pages)
    {
      serializer: 'pages',
      stat_record: pages.maximum(:updated_at)
    }
  end

  # include PgSearch::Model
  # multisearchable against: [:title, :content]
  after_save :create_json_cache

  private

  def create_json_cache
    CreatePagesJsonCacheJob.perform_later
  end
end
