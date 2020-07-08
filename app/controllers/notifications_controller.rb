class NotificationsController < ApplicationController

  def index
    @user = policy_scope(User).find(current_user.id)
    # binding.pry
    @recipes = Recipe.where(user: current_user)
    @likes = Like.where(recipe: @recipes).last(100)
  end
end
