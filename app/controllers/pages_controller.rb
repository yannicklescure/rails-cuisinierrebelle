class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show, :home, :tools, :conversion, :top_100]

  def show
    if Page.friendly.exists? params[:id]
      @page = Page.friendly.find(params[:id])
      authorize @page
    else
      not_found
    end
  end

  def new
    @page = Page.new
    authorize @page
  end

  def create
    @page = Page.new(page_params)
    authorize @page
    if @page.save
      redirect_to page_path(@page)
    else
      render :new
    end
  end

  def edit
    @page = Page.friendly.find(params[:id])
    authorize @page
  end

  def update
    @page = Page.friendly.find(params[:id])
    authorize @page
    if @page.update(page_params)
      redirect_to page_path(@page)
    else
      render :edit
    end

  end

  def destroy
    @page = Page.friendly.find(params[:id])
    authorize @page
    if @page.destroy
      redirect_to root_path
    else
      render :edit
    end
  end

  def home
    @recipes = Recipe.all
    # binding.pry
    @bookmarks = Bookmark.where(user: current_user)
    @liked = Like.find_by(user: current_user, recipe: @recipe)
    @unsplash_search_results = Unsplash::Photo.search("cooking,food")
    @unsplash_search_result = @unsplash_search_results[rand(@unsplash_search_results.length)]
    @banner_bg = @unsplash_search_result.urls.raw + "&w=1600&h=900&fm=webp"
    # binding.pry
  end

  def conversion
    @bookmarks = Bookmark.where(user: current_user)
  end

  def tools
    @bookmarks = Bookmark.where(user: current_user)
    @products = Product.all
    if user_signed_in? && current_user.admin
      @user_view = params[:user_view] == 'true' || params[:user_view].nil?
    else
      @user_view = true
    end
  end

  def top_100
    @top_100 = "top 100"
    @recipes = Recipe.all.sort_by {|k,v| k.likes_count}.reverse[0...100]
    # binding.pry
  end

  private

  def page_params
    params.require(:page).permit(:title, :content)
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
