class Analytics < ApplicationRecord
  def self.cache_key(analytics)
    {
      serializer: 'analytics',
      stat_record: analytics.maximum(:updated_at)
    }
  end

  after_commit :flush_cache!
  after_save :create_json_cache

  private

  def flush_cache!
    puts 'flushing the cache...'
    Rails.cache.delete Analytics.cache_key(Analytics.all)
    # Rails.cache.delete 'all_employees'
    # Rails.cache.delete "employees_#{gender}"
  end

  def create_json_cache
    CreateAnalyticsJsonCacheJob.perform_later
  end
end
