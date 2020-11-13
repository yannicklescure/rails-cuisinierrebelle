require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsCuisinierRebelle
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.middleware.use Rack::Deflater

    config.middleware.delete ActionDispatch::Session::CookieStore

    # https://github.com/iain/http_accept_language
    config.i18n.available_locales = %w(en fr es)

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins %w[
          http://www.cuisinierrebelle.com
          https://www.cuisinierrebelle.com
        ]
        resource '/assets/*', headers: :any, methods: [:get, :post, :options]
      end
    end

    config.assets.configure do |env|
      env.export_concurrent = false
    end

  end
end
