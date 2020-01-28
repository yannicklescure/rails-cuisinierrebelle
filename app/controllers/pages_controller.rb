class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def home
    @recipes = Recipe.all
    @bookmarks = Bookmark.where(user: current_user)
    @likes = Like.find_by(user: current_user, recipe: @recipe)
  end

  def conversion
    @bookmarks = Bookmark.where(user: current_user)
  end

  def tools
    @bookmarks = Bookmark.where(user: current_user)
  end
end
