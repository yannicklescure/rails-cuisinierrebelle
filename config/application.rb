require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsCuisinierRebelle
  class Application < Rails::Application

    # Set the locale used for i18n
    # https://github.com/iain/http_accept_language
    # set the default locale to French
    config.i18n.default_locale = :fr
    # if a locale isn't found fall back to this default locale
    config.i18n.fallbacks = true
    # set the possible locales to English and Brazilian-Portuguese
    config.i18n.available_locales = [:en, :es, :fr]
    # config.i18n.available_locales = %w(en es fr)

    config.generators do |generate|
          generate.assets false
          generate.helper false
          generate.test_framework  :test_unit, fixture: false
        end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults "6.0"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # force tags to be saved downcased
    ActsAsTaggableOn.force_lowercase = true

    config.active_job.queue_adapter = :sidekiq
  end
end
