class GoogleAnalyticsReport
  def initialize
    data = []
    response = next_request("0")
    data << response.reports[0].data.rows
    while !response.reports.first.next_page_token.nil?
      response = next_request(response.reports.first.next_page_token)
      data << response.reports[0].data.rows
    end
    # binding.pry

    rows = []
    data.each do |items|
      items.each do |item|
        rows << item
      end
    end
    # binding.pry
    pages = {}
    rows.each do |row|
      # url = row.dimensions[0]
      url = row.dimensions[0]
      url = '/' if url.match?(/^(\/fr|\/en|\/es)/)
      url = url.match(/^(?:\/fr|\/en|\/es)(.+)/)[1] if url.match?(/^(\/fr|\/en|\/es)(.+)/)
      url = '/r' + url.match(/^(?:\/recipes)(.+)/)[1] if url.match?(/^(\/recipes)(.+)/)
      url = '/u' + url.match(/^(?:\/users)(.+)/)[1] if url.match?(/^(\/users)(.+)/)
      url = url.tr('-','') if url.match?(/^(\/u)(.+)/)
      url = url.match(/^[^\?]+/)[0]
      # url = url.match(/(.+)(?:\/$)/)[1] if url.match?(/\/$/)

      if pages[url].nil?
        pages[url] = row.metrics[0].values[0].to_i
      else
        pages[url] += row.metrics[0].values[0].to_i
      end
    end
    @analytics = Analytics.create(data: pages)

    pages.each do |page, value|
      puts "#{page} #{value}"
      slug = page.match?(/(?:\/r\/)(.+)/) ? page.match(/(?:\/r\/)(.+)/)[1] : nil
      if page.match?(/(?:\/r\/)(.+)/)
        recipe = Recipe.find_by(slug: page.match(/(?:\/r\/)(.+)/)[1])
        # puts recipe.slug unless recipe.nil?
        unless recipe.nil?
          recipe.views = value
          recipe.save
        end
      end
    end
  end

  def next_request(next_page_token)
    # Set the date range - this is always required for report requests
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
      view_id: ENV['GOOGLE_VIEW_ID'],
      sampling_level: 'DEFAULT',
      # filters_expression: "ga:country==United Kingdom",
      date_ranges: [date_range],
      metrics: [metric],
      dimensions: [dimension],
      page_token: next_page_token
      # page_size: 10_000
    )
    # Create a new report request
    request = Google::Apis::AnalyticsreportingV4::GetReportsRequest.new(
      { report_requests: [report_request] }
    )
    # Make API call.
    response = $google_client.batch_get_reports(request)
  end
end
