class LikesController < ApplicationController
  def update
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
  end
end
