# CarrierWave.configure do |config|
#  config.cache_storage = :file
# end

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV['S3_KEY'],                # required unless using use_iam_profile
    aws_secret_access_key: ENV['S3_SECRET'],             # required unless using use_iam_profile
    use_iam_profile:       false,                         # optional, defaults to false
    region:                ENV['S3_REGION'],             # optional, defaults to 'us-east-1'
    host:                  ENV['S3_BUCKET_NAME'],        # optional, defaults to nil
    endpoint:              ENV['S3_ASSET_URL']           # optional, defaults to nil
  }
  config.fog_directory  = ENV['S3_BUCKET_NAME']                                 # required
  config.fog_public     = true                                                 # optional, defaults to true
  config.fog_attributes = { cache_control: "public, max-age=#{365.days.to_i}" } # optional, defaults to {}
  config.asset_host = ENV['S3_CDN_URL']
end
