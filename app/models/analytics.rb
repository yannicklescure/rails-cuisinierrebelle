class Analytics < ApplicationRecord
  def self.cache_key(analytics)
    {
      serializer: 'analytics',
      stat_record: Analytics.maximum(:updated_at)
    }
  end

  after_save :create_json_cache

  private

  def create_json_cache
    CreateAnalyticsJsonCacheJob.perform_later
  end
end
