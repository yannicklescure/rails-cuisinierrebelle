Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, :controllers => { registrations: 'users/registrations', sessions: 'users/sessions' }

  scope '(:locale)', locale: /en|fr|es/ do
    root to: 'pages#home'
    get '/conversion', to: 'pages#conversion', as: 'conversion'
    get '/tools', to: 'pages#tools', as: 'tools'

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :recipes do
      resource :bookmarks, only: [:update]
      resource :likes, only: [:update]
    end
    # get '/recettes', to: 'recipes#index', as: 'recettes'
    resources :users, only: [:show]
    resources :bookmarks, only: [:index]
    resources :index, only: [:index], as: 'index'
  end
end
