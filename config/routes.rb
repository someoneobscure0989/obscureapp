Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect('/products/sample-product', status: 302)

  get '/products/:slug', to: 'products#detail'
  post '/products/submitReview', to: 'products#submit_review', as: 'submit_review'

  namespace :api do
    resources :products, param: :slug, only: [:show], defaults: { format: :json }
  end
end
