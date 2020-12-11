require 'open-uri'

# Create a Google Analytics Reporting service
service = Google::Apis::AnalyticsreportingV4::AnalyticsReportingService.new

# Create service account credentials
credentials = Google::Auth::ServiceAccountCredentials.make_creds(
  json_key_io: open('https://assets.cuisinierrebelle.com/cuisinier-rebelle-b05e87863f39.json'),
  scope: 'https://www.googleapis.com/auth/analytics.readonly'
)

# Authorize with our readonly credentials
service.authorization = credentials

$google_client = service
