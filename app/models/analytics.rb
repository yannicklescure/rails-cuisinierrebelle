class Analytics < ApplicationRecord
  def self.cache_key(analytics)
    {
      serializer: 'analytics',
      stat_record: Analytics.maximum(:updated_at)
    }
  end
end
