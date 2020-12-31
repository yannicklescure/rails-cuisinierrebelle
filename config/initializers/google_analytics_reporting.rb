# export GOOGLE_ACCOUNT_TYPE="service_account"
# export GOOGLE_CLIENT_ID=ENV["GOOGLE_CLIENT_ID"]
# export GOOGLE_CLIENT_EMAIL=ENV["GOOGLE_CLIENT_EMAIL"]
# export GOOGLE_PRIVATE_KEY=ENV["GOOGLE_PRIVATE_KEY"]

# Create a Google Analytics Reporting service
service = Google::Apis::AnalyticsreportingV4::AnalyticsReportingService.new

json = {
  "type": "service_account",
  "project_id": ENV["GOOGLE_PROJECT_ID"],
  "private_key_id": ENV["GOOGLE_PRIVATE_KEY_ID"],
  "private_key": ENV["GOOGLE_PRIVATE_KEY"],
  "client_email": ENV["GOOGLE_CLIENT_EMAIL"],
  "client_id": ENV["GOOGLE_CLIENT_ID"],
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ENV["GOOGLE_CLIENT_X509_CERT_URL"]
}

# Create service account credentials
credentials = Google::Auth::ServiceAccountCredentials.make_creds(
  # json_key_io: File.open('/cuisinier-rebelle-b05e87863f39.json'),
  scope: 'https://www.googleapis.com/auth/analytics.readonly'
)

# Authorize with our readonly credentials
service.authorization = credentials

$google_client = service
