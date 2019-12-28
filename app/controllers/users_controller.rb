class UsersController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    @bookmarks = Bookmark.where(user: current_user)
  end
end
