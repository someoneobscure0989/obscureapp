Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/products/:slug', to: 'products#detail'
  post '/products/submitReview', to: 'products#submit_review'
end
