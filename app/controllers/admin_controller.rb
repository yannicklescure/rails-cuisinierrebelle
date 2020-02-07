class AdminController < ApplicationController

  def index
    # @users = policy_scope(User).where.not(id: current_user.id)
    @users = policy_scope(User)
    @recipes = Recipe.all
    @comments = Comment.all
    @replies = Reply.all
  end

  def users
    @users = User.all
  end

  def recipes
    @recipes = Recipe.all
  end

  def comments
    @comments = Comment.all
    @replies = Reply.all
  end
end
