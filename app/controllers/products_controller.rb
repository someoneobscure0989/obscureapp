class ProductsController < ApplicationController
  def detail
    @product = Product.find_by! slug: params[:slug]
  end
end
