class CreateAnalyticsJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    @analytics = Analytics.all
    # binding.pry
    Rails.cache.fetch(Analytics.cache_key(@analytics)) do
      MultiJson.dump({
        data: @analytics.last.data
      })
    end
  end
end
