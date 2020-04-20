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

    get '/en/pg/news', to: redirect('/pg/news')
    get '/en/pg/nouvelles', to: redirect('/pg/news')
    get '/en/pg/noticias', to: redirect('/pg/news')
    get '/es/pg/news', to: redirect('/pg/noticias')
    get '/es/pg/nouvelles', to: redirect('/pg/noticias')
    get '/es/pg/noticias', to: redirect('/pg/noticias')
    get '/fr/pg/news', to: redirect('/pg/nouvelles')
    get '/fr/pg/nouvelles', to: redirect('/pg/nouvelles')
    get '/fr/pg/noticias', to: redirect('/pg/nouvelles')

    get '/en/pg/policies', to: redirect('/pg/policies')
    get '/en/pg/politicas', to: redirect('/pg/policies')
    get '/en/pg/charte', to: redirect('/pg/policies')
    get '/es/pg/policies', to: redirect('/pg/politicas')
    get '/es/pg/politicas', to: redirect('/pg/politicas')
    get '/es/pg/charte', to: redirect('/pg/politicas')
    get '/fr/pg/policies', to: redirect('/pg/charte')
    get '/fr/pg/politicas', to: redirect('/pg/charte')
    get '/fr/pg/charte', to: redirect('/pg/charte')

    get '/en/pg/help', to: redirect('/pg/help')
    get '/en/pg/help', to: redirect('/pg/help')
    get '/en/pg/aide', to: redirect('/pg/help')
    get '/es/pg/help', to: redirect('/pg/ayuda')
    get '/es/pg/ayuda', to: redirect('/pg/ayuda')
    get '/es/pg/aide', to: redirect('/pg/ayuda')
    get '/fr/pg/help', to: redirect('/pg/aide')
    get '/fr/pg/ayuda', to: redirect('/pg/aide')
    get '/fr/pg/aide', to: redirect('/pg/aide')

    get '/en/pg/experiences', to: redirect('/pg/experiences')
    get '/en/pg/experiencias', to: redirect('/pg/experiences')
    get '/en/pg/experiences-fr', to: redirect('/pg/experiences')
    get '/es/pg/experiences', to: redirect('/pg/experiencias')
    get '/es/pg/experiencias', to: redirect('/pg/experiencias')
    get '/es/pg/experiences-fr', to: redirect('/pg/experiencias')
    get '/fr/pg/experiences', to: redirect('/pg/experiences-fr')
    get '/fr/pg/experiencias', to: redirect('/pg/experiences-fr')
    get '/fr/pg/experiences-fr', to: redirect('/pg/experiences-fr')

    get '/en/pg/community', to: redirect('/pg/community')
    get '/en/pg/comunidad', to: redirect('/pg/community')
    get '/en/pg/communaute', to: redirect('/pg/community')
    get '/es/pg/community', to: redirect('/pg/comunidad')
    get '/es/pg/comunidad', to: redirect('/pg/comunidad')
    get '/es/pg/communaute', to: redirect('/pg/comunidad')
    get '/fr/pg/community', to: redirect('/pg/communaute')
    get '/fr/pg/comunidad', to: redirect('/pg/communaute')
    get '/fr/pg/communaute', to: redirect('/pg/communaute')

    get '/en/pg/terms', to: redirect('/pg/terms')
    get '/en/pg/terminos-de-uso', to: redirect('/pg/terms')
    get '/en/pg/conditions', to: redirect('/pg/terms')
    get '/es/pg/terms', to: redirect('/pg/terminos-de-uso')
    get '/es/pg/terminos-de-uso', to: redirect('/pg/terminos-de-uso')
    get '/es/pg/conditions', to: redirect('/pg/terminos-de-uso')
    get '/fr/pg/terms', to: redirect('/pg/conditions')
    get '/fr/pg/terminos-de-uso', to: redirect('/pg/conditions')
    get '/fr/pg/conditions', to: redirect('/pg/conditions')

    get '/en/pg/privacy-policy', to: redirect('/pg/privacy-policy')
    get '/en/pg/politica-de-privacidad', to: redirect('/pg/privacy-policy')
    get '/en/pg/confidentialite', to: redirect('/pg/privacy-policy')
    get '/es/pg/privacy-policy', to: redirect('/pg/politica-de-privacidad')
    get '/es/pg/politica-de-privacidad', to: redirect('/pg/politica-de-privacidad')
    get '/es/pg/confidentialite', to: redirect('/pg/politica-de-privacidad')
    get '/fr/pg/privacy-policy', to: redirect('/pg/confidentialite')
    get '/fr/pg/politica-de-privacidad', to: redirect('/pg/confidentialite')
    get '/fr/pg/confidentialite', to: redirect('/pg/confidentialite')

    get '/en/pg/sitemap', to: redirect('/pg/sitemap')
    get '/en/pg/mapa-del-sitio', to: redirect('/pg/sitemap')
    get '/en/pg/plan-du-site', to: redirect('/pg/sitemap')
    get '/es/pg/sitemap', to: redirect('/pg/mapa-del-sitio')
    get '/es/pg/mapa-del-sitio', to: redirect('/pg/mapa-del-sitio')
    get '/es/pg/plan-du-site', to: redirect('/pg/mapa-del-sitio')
    get '/fr/pg/sitemap', to: redirect('/pg/plan-du-site')
    get '/fr/pg/mapa-del-sitio', to: redirect('/pg/plan-du-site')
    get '/fr/pg/plan-du-site', to: redirect('/pg/plan-du-site')

    resources :pages, except: [:index], path: '/pg'

    get '/:locale/pages/:id', to: redirect('/%{locale}/pg/%{id}')
    get '/pages/:id', to: redirect('/pg/%{id}')

    resources :products, except: [:index, :show]

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :recipes, expect: [:index], path: '/r' do
      resource :bookmarks, only: [:update]
      resource :likes, only: [:update]
      resources :comments, except: [:index, :show] do
        resource :likes, only: [:update]
        resources :replies, except: [:index, :show] do
          resource :likes, only: [:update]
        end
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
