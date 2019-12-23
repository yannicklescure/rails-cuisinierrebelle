class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @recipes = Recipe.all
    @bookmarks = Bookmark.where(user: current_user)
  end
end
