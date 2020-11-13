# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # allow do
  #   origins '*'
  #   resource '*', headers: :any, methods: [:get, :post, :patch, :put]
  # end

  allow do
    # origins   '*'

    origins %w[
          http://www.cuisinierrebelle.com
          https://www.cuisinierrebelle.com
        ]

    resource '/assets/*', headers: :any, methods: [:get, :post, :options]

    resource  '/api/v1/*',
              headers: %w(Authorization),
              methods: :any,
              expose: %w(Authorization)

    # resource  '*',
    #           headers: :any,
    #           methods: [:get, :post, :delete, :put, :patch, :options, :head],
    #           max_age: 0
  end
end

Rails.application.config.hosts << "www.cuisinierrebelle.com"
