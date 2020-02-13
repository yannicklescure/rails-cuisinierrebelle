class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show, :home]

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

  def delete
    authorize @page
  end

  def home
    @recipes = Recipe.all
    @bookmarks = Bookmark.where(user: current_user)
    @liked = Like.find_by(user: current_user, recipe: @recipe)
  end

  def conversion
    @bookmarks = Bookmark.where(user: current_user)
  end

  def tools
    @bookmarks = Bookmark.where(user: current_user)
  end

  private

  def page_params
    params.require(:page).permit(:title, :content)
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
