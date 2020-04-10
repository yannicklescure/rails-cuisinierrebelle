class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :tagged]

  def index
    # @recipes = Recipe.all
    @recipes = policy_scope(Recipe)
    @query = params[:query]
    if @query.present?
      @recipes = PgSearch.multisearch(params[:query]).order('created_at DESC').map { |r| Recipe.find(r.id) }
    end
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
