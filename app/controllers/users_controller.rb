class UsersController < ApplicationController
  before_action :set_user, only: [:follow, :unfollow]
  skip_before_action :authenticate_user!, only: [:show]

  def index
    # @users = User.where.not(id: current_user.id)
    @users = policy_scope(User).where.not(id: current_user.id)
  end

  def show
    if User.friendly.exists? params[:id]
      @user = User.friendly.find(params[:id])
      @bookmarks = Bookmark.where(user: current_user)
      @recipes = Recipe.where(user: @user)
      authorize @user
    else
      not_found
    end
  end

  def follow
    authorize @user
    if current_user.follow(@user.id)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
    end
  end

  def unfollow
    authorize @user
    if current_user.unfollow(@user.id)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js { render action: :follow }
      end
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
