class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :tagged]

  def index
    @recipes = policy_scope(Recipe)
    @bookmarks = Bookmark.where(user: current_user)
    @query = params[:query]
    if @query.present?
      @results = PgSearch.multisearch(@query)
      @recipes = @results.map { |r| Recipe.find(r.searchable_id) }.sort_by {|k,v| k.id}.reverse
      # binding.pry
      Search.new(query: @query, user: current_user).save
    end
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
