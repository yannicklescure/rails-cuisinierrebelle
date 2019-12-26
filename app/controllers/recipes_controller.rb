class RecipesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def index
    @recipes = Recipe.all
    @bookmarks = Bookmark.where(user: current_user)
  end

  def show
    # @recipe = Recipe.find(params[:id])
    @recipe = Recipe.friendly.find(params[:id])
    @bookmark = Bookmark.find_by(user: current_user, recipe: @recipe)
    @bookmarks = Bookmark.where(user: current_user)
    @like = Like.find_by(user: current_user, recipe: @recipe)
    @likes = Like.where(user: current_user, recipe: @recipe)
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to recipe_path(@recipe)
    else
      render :new
    end
  end

  def edit
    @recipe = Recipe.friendly.find(params[:id])
  end

  def update
    @recipe = Recipe.friendly.find(params[:id])
    if @recipe.update(recipe_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    redirect_to recipes_path
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :subtitle, :video, :ingredients, :direction, :description)
  end
end
