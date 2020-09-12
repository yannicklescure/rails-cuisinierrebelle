class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :tagged]

  def index
    @recipes = policy_scope(Recipe)
    @bookmarks = Bookmark.where(user: current_user)
    @query = params[:query]
    if @query.present?
      @search_users = User.search(@query)
      @search_recipes = Recipe.search(@query)
      @results = {
        user: @search_users.any? ? @search_users.map { |r| User.find(r.id) }.sort_by {|k,v| k.id}.reverse : nil,
        recipe: @search_recipes.any? ? @search_recipes.map { |r| Recipe.find(r.id) }.sort_by {|k,v| k.id}.reverse : nil
      }
      # binding.pry
      # if @search_results.any?
      #   case @search_results[0].searchable_type
      #   when 'User'
      #     @results = @search_results.map { |r| User.find(r.searchable_id) }.sort_by {|k,v| k.id}.reverse
      #   when 'Recipe'
      #     @results = @search_results.map { |r| Recipe.find(r.searchable_id) }.sort_by {|k,v| k.id}.reverse
      #   else
      #     @results = []
      #   end
      # else
      #   @results = Recipe.tagged_with(@query).map { |r| r }.sort_by {|k,v| k.id}.reverse
      # end
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
