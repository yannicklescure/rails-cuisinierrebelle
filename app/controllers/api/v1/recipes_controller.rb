class Api::V1::RecipesController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_recipe, only: [ :show, :update ]

  def index
    @recipes = policy_scope(Recipe).order('created_at DESC')
    @user_recipes = params[:recipes]
    if @user_recipes.present?
      # binding.pry
      @recipes = @recipes.filter { |r| r.user_id == current_user.id }
    end
    @bookmarks = params[:bookmarks]
    if @bookmarks.present?
      @recipes = current_user.bookmarks.map { |r| Recipe.find(r.recipe_id) }.compact.reverse
    end
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
      else
        @search_results = Recipe.tagged_with(@query).map { |r| r }.sort_by {|k,v| k.id}.reverse
        # binding.pry
      end

      # @recipes = []
      max = [48, Recipe.all.count].min
      @recipes = @search_results
      if @recipes.count < max
        Recipe.all.select { |r| r unless @recipes.include? r }.shuffle.take(max - @recipes.count).map { |e| @recipes << e }
      end
      # binding.pry

      @user = current_user.nil? ? nil : current_user.id
      @device = DeviceDetector.new(request.user_agent).device_type
      Search.new(query: @query, user: @user, device: @device).save
    end
    @cards = params[:cards]
    if @cards.present?
      @cards = params[:cards].to_i > @recipes.count ? @recipes.count : params[:cards].to_i
      @recipes = @recipes.take(@cards)
    else
      # binding.pry
      @recipes = @recipes.take(24)
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
