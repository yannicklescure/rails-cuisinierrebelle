class Api::V1::RecipesController < Api::V1::BaseController
  before_action :set_recipe, only: [ :show ]

  def index
    @recipes = policy_scope(Recipe)
  end


  def show
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
    authorize @recipe  # For Pundit
  end
end
