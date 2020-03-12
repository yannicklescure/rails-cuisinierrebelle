class FollowingController < ApplicationController
  def index
    # @follows = current_user.following
    @user = policy_scope(User).find_by(id: current_user.id)
  end
end
