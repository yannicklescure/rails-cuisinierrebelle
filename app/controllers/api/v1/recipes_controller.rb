class Api::V1::RecipesController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_recipe, only: [ :show, :update ]

  def index
    @recipes = policy_scope(Recipe).order('created_at DESC')
    @users = User.all
    if params[:timestamp].present?
      render json: {
        timestamp: (Recipe.last.created_at.to_f * 1000).to_i
      }
    end
    @slug = params[:slug]
    # binding.pry
    if @slug.present?
      user = User.find_by(slug: @slug)
      @recipes = @recipes.filter { |r| r.user_id == user.id }
    end
    @user_recipes = params[:recipes]
    if @user_recipes.present?
      @recipes = @recipes.filter { |r| r.user_id == current_user.id }
    end
    @bookmarks = params[:bookmarks]
    if @bookmarks.present?
      @recipes = current_user.bookmarks.map { |r| Recipe.find(r.recipe_id) }.compact.reverse
    end
    @query = params[:query]
    if @query.present?
      # @pg_search_results = PgSearch.multisearch(@query)
      # @search_results = []
      # if @pg_search_results.any?
      #   case @pg_search_results[0].searchable_type
      #   when 'User'
      #     @search_results = @pg_search_results.map { |r| User.find(r.searchable_id) }.sort_by {|k,v| k.id }.reverse
      #   when 'Recipe'
      #     @search_results = @pg_search_results.map { |r| Recipe.find(r.searchable_id) }.sort_by {|k,v| k.id }.reverse
      #   else
      #     @search_results = []
      #   end
      # else
      #   @search_results = Recipe.tagged_with(@query).map { |r| r }.sort_by {|k,v| k.id}.reverse
      # end

      @search_users = User.search(@query)
      @search_recipes = Recipe.search(@query)
      @search_results = {
        user: @search_users.any? ? @search_users.map { |r| User.find(r.id) }.sort_by {|k,v| k.id}.reverse : nil,
        recipe: @search_recipes.any? ? @search_recipes.map { |r| Recipe.find(r.id) }.sort_by {|k,v| k.id}.reverse : nil
      }

      # @recipes = @results[:recipe].nil? ? [] : @results[:recipe]
      # max = [48, Recipe.all.count].min
      # if @recipes.count < max
      #   Recipe.all.select { |r| r unless @recipes.include? r }.shuffle.take(max - @recipes.count).map { |e| @recipes << e }
      # end

      @user = current_user.nil? ? nil : current_user.id
      @device = DeviceDetector.new(request.user_agent).device_type
      Search.new(query: @query, user: @user, device: @device).save
    end
    @cards = params[:cards]
    if @cards.present?
      @cards = params[:cards].to_i > @recipes.count ? @recipes.count : params[:cards].to_i
      @recipes = @cards == 24 ? @recipes : @recipes.take(@cards)
      @recipes_count = Recipe.all.count
      # binding.pry
    else
      # @recipes = @recipes.take(24)
      # binding.pry
    end
  end

  def show
  end

  def update
    if @recipe.update(recipe_params)
      render :show
    else
      render_error
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :subtitle, :video, :direction, :description, :photo, :image, :tag_list)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
    authorize @recipe  # For Pundit
  end
end
