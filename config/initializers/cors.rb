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

    # All asset requests should be to rails prefixed assets paths
    # serverd from the asset pipeline (e.g.: "/assets/*" by default)
    resource "#{Rails.application.config.assets.prefix}/*",
      # Allow any request headers to be sent in the asset request
      # https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Headers
      headers: :any,
      # All asset fetches should be via GET
      # Support OPTIONS for pre-flight requests
      # https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
      methods: [:get, :options]

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
