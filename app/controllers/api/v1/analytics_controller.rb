class Api::V1::AnalyticsController < Api::V1::BaseController
  # before_action :authenticate_user!, except: [ :index ]

  def index
    @analytics = policy_scope(Analytics)
    # binding.pry
    json = Rails.cache.fetch(Analytics.cache_key(@analytics)) do
      MultiJson.dump({
        data: @analytics.last.data
      })
    end
    render json: json
  end

end
