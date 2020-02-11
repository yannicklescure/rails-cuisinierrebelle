# require 'fog'
# require 'fog-aws'
# require 'aws-sdk'

# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://www.cuisinierrebelle.com/"

# The remote host where your sitemaps will be hosted
SitemapGenerator::Sitemap.sitemaps_host = "https://sitemap.cuisinierrebelle.com/"

# The directory to write sitemaps to locally
SitemapGenerator::Sitemap.public_path = "public/"

# Set this to a directory/path if you don't want to upload to the root of your `sitemaps_host`
# SitemapGenerator::Sitemap.sitemaps_path = 'sitemaps/'

# # The adapter to perform the upload of sitemap files.
SitemapGenerator::Sitemap.adapter = SitemapGenerator::AwsSdkAdapter.new(ENV['S3_BUCKET_NAME_SITEMAP'],
  aws_access_key_id: ENV['S3_KEY'],
  aws_secret_access_key: ENV['S3_SECRET'],
  aws_region: ENV['S3_REGION']
)

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end
  add root_path, :changefreq => 'daily'

  [nil, :en, :fr, :es].each do |locale|
    Recipe.find_each do |recipe|
      # binding.pry
      add recipe_path(recipe, :locale => locale), :changefreq => 'weekly', :lastmod => recipe.updated_at
    end
  end
end

