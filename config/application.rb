require_relative 'boot'
require 'rails/all'

# require 'zlib'
# require 'brotli'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsCuisinierRebelle
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # config.api_only = true

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.active_job.queue_adapter = :sidekiq

    config.middleware.use Rack::Deflater
    config.middleware.use Rack::Brotli

    config.middleware.delete ActionDispatch::Session::CookieStore

    # https://github.com/iain/http_accept_language
    config.i18n.available_locales = %w(en fr es)
    config.i18n.default_locale = :fr

    config.assets.configure do |env|
      env.export_concurrent = false
    end

  end
end
