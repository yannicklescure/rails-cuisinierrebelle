class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :tagged]

  def index
    # @recipes = Recipe.all
    if params[:query].present?
      @results = PgSearch.multisearch(params[:query])
    else
    end
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
