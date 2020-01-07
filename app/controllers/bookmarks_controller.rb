class BookmarksController < ApplicationController
  def index
    # @bookmarks = Bookmark.where(user: current_user)
    @bookmarks = policy_scope(Bookmark).where(user_id: current_user.id)
  end

  def update
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @bookmark = Bookmark.find_by(user: current_user, recipe: @recipe)
    if @bookmark
      @bookmark.destroy
      @bookmarked = false
    else
      @bookmark = Bookmark.create(user: current_user, recipe: @recipe)
      @bookmarked = true
    end
    @bookmarks = Bookmark.where(user: current_user)
    authorize @bookmark
  end
end
