class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # @recipes = Recipe.all
    @recipes = policy_scope(Recipe)
    @bookmarks = Bookmark.where(user: current_user)
  end

  def tagged
    if params[:tag].present?
      # @recipes = Recipe.tagged_with(params[:tag])
      @recipes = policy_scope(Recipe).tagged_with(params[:tag])
    else
      # @recipes = Recipe.all
      @recipes = policy_scope(Recipe).where(user: current_user)
    end
    authorize @recipes
  end
end
