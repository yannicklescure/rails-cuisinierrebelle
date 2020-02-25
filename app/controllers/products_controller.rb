# require 'uri'
require 'open-uri'

class ProductsController < ApplicationController
  before_action :set_admin

  def new
    @product = Product.new
    authorize @product
    # binding.pry
  end

  def create
    @product = Product.new(product_params)
    authorize @product
    if @product.save && valid_url?(@product)
      redirect_to tools_path
    else
      render :new
    end
  end

  def edit
    @product = Product.find(params[:id])
    authorize @product
  end

  def update
    @product = Product.find(params[:id])
    authorize @product
    if @product.update(product_params) && valid_url?(@product)
      redirect_to tools_path
    else
      render :edit
    end
  end

  def destroy
    @product = Product.find(params[:id])
    authorize @product
    @product.remove_photo
    @product.save
    @product.destroy
    redirect_to tools_path
  end

  private

  def product_params
    params.require(:product).permit(:title, :description, :photo, :url)
  end

  def set_admin
    @admin = current_user.admin
  end

  def valid_url?(record)
    # binding.pry
    valid_url = open(record.url).status[0].to_i == 200 rescue false
    record.errors[:url] << "must be a valid URL" unless valid_url
    valid_url
  end
end
