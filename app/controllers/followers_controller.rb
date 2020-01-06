class FollowersController < ApplicationController
  def index
    # @followers = current_user.followers
    @followers = policy_scope(User).find_by(id: current_user.id).followers
  end
end
