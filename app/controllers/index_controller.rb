class IndexController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # @recipes = Recipe.all
    @recipes = policy_scope(Recipe)
    @bookmarks = Bookmark.where(user: current_user)
  end
end
