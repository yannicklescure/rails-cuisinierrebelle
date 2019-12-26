class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @recipes = Recipe.all
    @bookmarks = Bookmark.where(user: current_user)
    @liked = Like.find_by(user: current_user, recipe: @recipe)
  end
end
