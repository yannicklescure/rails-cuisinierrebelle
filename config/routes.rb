Rails.application.routes.draw do

  get '/sitemap.xml', to: redirect('https://sitemap.cuisinierrebelle.com/sitemap.xml.gz', status: 301)

  # devise_for :users, as: :api, defaults: { format: :json }
  devise_for :users,
    defaults: { format: :json },
    # class_name: 'Api::V1::Users',
    controllers: {
     sessions: 'api/v1/sessions',
     registrations: 'api/v1/registrations'
    },
    path_prefix: '/api/v1'
    # as: :api

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [ :index ]
      resources :state, only: [ :index ]
      resources :recipes, only: [ :index, :show, :update ]
      resources :recipe_logs, only: [ :create ]
      resources :likes, only: [ :create, :destroy ]
      resources :mailchimp, only: [ :show, :update ]
      resources :notification, only: [ :show, :update ]
      resources :freemium, only: [ :show, :update ]
      # resources :session, only: [ :create, :destroy ]
    end
  end

  scope '(:locale)', locale: /en|es|fr/ do
  #   # get '/:id/settings', to: 'settings#index', as: 'user_settings'
  #   # get '/:id/edit', to: 'users/registrations#edit', as: 'user_edit'
  #   # patch '/:id', to: 'users/registrations#update', as: 'user_update'
  #   # resources :users, only: [:show], path: '/'

  #   # resources :pages, except: [:index, :show], path: '/p'

  # # this route entry will take care of forwarding all the page/* urls to the index
  # # get '/u/:id', to: 'posts#show', format: false#, constraints: { id: /.*/ }
  # get '/status', to: redirect('/status/top')
  # get '/status/top', to: 'posts#index', format: false
  # get '/status/:id', to: 'posts#show', format: false#, constraints: { id: /.*/ }
  # match '/status/*path', to: 'posts#index', format: false, via: :get

    # root to: "application#index"
    # match "*path", to: "application#index", format: false, via: :get
    root to: 'vue#index', format: false
    match "*path", to: "vue#index", format: false, via: :get
  end

  # Sidekiq Web UI, only for admins.
  # require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end
end
