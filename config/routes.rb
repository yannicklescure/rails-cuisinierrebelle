Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, :controllers => { registrations: 'registrations' }

  scope '(:locale)', locale: /en|fr|es/ do
    root to: 'pages#home'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :recipes do
      resource :bookmarks, only: [:update]
      resource :likes, only: [:update]
    end
    # get '/recettes', to: 'recipes#index', as: 'recettes'
    resources :users, only: [:show]
    resources :bookmarks, only: [:index]
  end
end
