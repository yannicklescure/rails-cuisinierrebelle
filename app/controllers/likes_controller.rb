class LikesController < ApplicationController
  def update
    # binding.pry
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @like = Like.find_by(user: current_user, recipe: @recipe)
    if @like
      @like.destroy
      @liked = false
    else
      @like = Like.create(user: current_user, recipe: @recipe)
      @liked = true
    end
    # @likes = Like.where(user: current_user, recipe: @recipe)
    @recipe.likes_count = @recipe.likes.count
    @recipe.save
    # authorize @recipe
    authorize @like
  end
end
