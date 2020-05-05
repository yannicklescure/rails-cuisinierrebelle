class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :tagged]

  def index
    @recipes = policy_scope(Recipe)
    @bookmarks = Bookmark.where(user: current_user)
    @query = params[:query]
    if @query.present?
      @pg_search_results = PgSearch.multisearch(@query)
      # binding.pry
      @search_results = []
      if @pg_search_results.any?
        case @pg_search_results[0].searchable_type
        when 'User'
          @search_results = @pg_search_results.map { |r| User.find(r.searchable_id) }.sort_by {|k,v| k.id}.reverse
        when 'Recipe'
          @search_results = @pg_search_results.map { |r| Recipe.find(r.searchable_id) }.sort_by {|k,v| k.id}.reverse
        else
          @search_results = []
        end
      end
      @user = current_user.nil? ? nil : current_user.id
      @device = DeviceDetector.new(request.user_agent).device_type
      Search.new(query: @query, user: @user, device: @device).save
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
