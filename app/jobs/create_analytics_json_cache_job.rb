class CreateAnalyticsJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)

    date_range = Google::Apis::AnalyticsreportingV4::DateRange.new(
      start_date: '2020-01-01',
      end_date: Date.yesterday.strftime('%F')
    )
    # Set the metric
    metric = Google::Apis::AnalyticsreportingV4::Metric.new(
      expression: "ga:pageviews"
    )
    # Set the dimension
    dimension = Google::Apis::AnalyticsreportingV4::Dimension.new(
      name: "ga:pagePath"
    )
    # Build up our report request and a add country filter
    report_request = Google::Apis::AnalyticsreportingV4::ReportRequest.new(
      view_id: ENV['GOOGLE_ANALYTICS_VIEW_ID'],
      sampling_level: 'DEFAULT',
      # filters_expression: "ga:country==United Kingdom",
      date_ranges: [date_range],
      metrics: [metric],
      dimensions: [dimension]
    )
    # Create a new report request
    request = Google::Apis::AnalyticsreportingV4::GetReportsRequest.new(
      { report_requests: [report_request] }
    )
    # Make API call.
    response = $google_client.batch_get_reports(request)
    analytics = response.reports[0].data

    Rails.cache.fetch(Analytics.cache_key(analytics)) do
      MultiJson.dump({
        data: analytics.last.data
      })
    end
  end
end
