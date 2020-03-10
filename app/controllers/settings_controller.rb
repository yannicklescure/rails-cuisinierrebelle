class SettingsController < ApplicationController
  before_action :set_user, only: [:follow, :unfollow]
  skip_before_action :authenticate_user!, only: [:show]

  def index
    @user = policy_scope(User).find_by(id: current_user.id)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
