Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions', omniauth_callbacks: 'users/omniauth_callbacks' }

  scope '(:locale)', locale: /en|fr|es/ do
    root to: 'pages#home'
    get '/conversion', to: 'pages#conversion', as: 'conversion'
    get '/tools', to: 'pages#tools', as: 'tools'
    get '/top100', to: 'pages#top_100', as: 'top_100'

    # namespace :admin, only: [:index] do
    #   resources :users, :recipes, :comments, :spam
    # end
    get '/admin', to: 'admin#index', as: 'admin'
    get '/admin/users', to: 'admin#users', as: 'admin_users'
    get '/admin/recipes', to: 'admin#recipes', as: 'admin_recipes'
    get '/admin/comments', to: 'admin#comments', as: 'admin_comments'
    get '/admin/spam', to: 'admin#spam'
    match 'users/:id' => 'users#destroy', :via => :delete, :as => :admin_destroy_user

    post 'comments/:id/spam', to: 'comments#spam', as: :comment_spam
    post 'replies/:id/spam', to: 'replies#spam', as: :reply_spam

    resources :pages, except: [:index], path: '/pg'
    get '/:locale/pages/:id', to: redirect('/%{locale}/pg/%{id}')
    get '/pages/:id', to: redirect('/pg/%{id}')

    resources :products, except: [:index, :show]

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :recipes, expect: [:index], path: '/r' do
      resource :bookmarks, only: [:update]
      resource :likes, only: [:update]
      resources :comments, except: [:index, :show] do
        resources :replies, except: [:index, :show]
      end
    end
    get '/:locale/recipes/:id', to: redirect('/%{locale}/r/%{id}')
    get '/recipes/:id', to: redirect('/r/%{id}')

    # resources :bookmarks, only: [:index]
    resources :index, only: [:index]
    get '/index/tagged', to: "index#tagged", as: :tagged
    # resources :followers, only: [:index]
    # resources :following, only: [:index]

    get '/u/:id/followers', to: 'users#followers', as: :user_followers
    get '/u/:id/following', to: 'users#following', as: :user_following

    resources :users, only: [:show], path: '/u' do
      member do
        post :follow
        post :unfollow
      end
      resources :recipes, :bookmarks, :settings, only: [:index]
    end
    get '/users/:id', to: redirect('/u/%{id}')
    # get '/u/:id/recipes', to: 'recipes#index'

    # resources :settings, only: [:index], as: :settings


  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :recipes, only: [ :index, :show, :update ]
      resources :mailchimp, only: [ :show, :update ]
      resources :notification, only: [ :show, :update ]
    end
  end

  get '/sitemap.xml', to: redirect('https://sitemap.cuisinierrebelle.com/sitemap.xml.gz', status: 301)

  # Sidekiq Web UI, only for admins.
  # require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end
end
