Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions', omniauth_callbacks: 'users/omniauth_callbacks' }

  scope '(:locale)', locale: /en|fr|es/ do
    root to: 'pages#home'
    get '/conversion', to: 'pages#conversion', as: 'conversion'
    get '/tools', to: 'pages#tools', as: 'tools'
    get '/admin', to: 'admin#index'
    get '/admin/users', to: 'admin#users'
    get '/admin/recipes', to: 'admin#recipes'
    get '/admin/comments', to: 'admin#comments'
    get '/admin/replies', to: 'admin#replies'

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :recipes do
      resource :bookmarks, only: [:update]
      resource :likes, only: [:update]
      resources :comments, except: [:index, :show] do
        resources :replies, except: [:index, :show]
      end
    end
    # get '/recettes', to: 'recipes#index', as: 'recettes'
    resources :bookmarks, only: [:index]
    resources :index, only: [:index]
    get '/index/tagged', to: "index#tagged", as: :tagged
    resources :followers, only: [:index]
    resources :following, only: [:index]

    resources :users, only: [:show] do
      member do
        post :follow
        post :unfollow
      end
    end
    get '/:id', to: 'users#show'
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :recipes, only: [ :index, :show, :update ]
    end
  end

  get '/sitemap.xml', to: redirect('https://sitemap.cuisinierrebelle.com/sitemap.xml.gz', status: 301)
end
