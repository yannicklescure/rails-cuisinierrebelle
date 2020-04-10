class Api::V1::RecipesController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_recipe, only: [ :show, :update ]

  def index
    @recipes = policy_scope(Recipe).order('created_at DESC')
    @query = params[:query]
    if @query.present?
      @results = PgSearch.multisearch(@query)
      @recipes = @results.map { |r| Recipe.find(r.searchable_id) }.sort_by {|k,v| v}.reverse
      #.order('created_at DESC')
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
