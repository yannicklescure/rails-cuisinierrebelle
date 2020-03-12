class FollowersController < ApplicationController
  def index
    # @followers = current_user.followers
    @user = policy_scope(User).find_by(id: current_user.id)
  end
end
