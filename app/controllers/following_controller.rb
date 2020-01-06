class FollowingController < ApplicationController
  def index
    # @follows = current_user.following
    @follows = policy_scope(User).find_by(id: current_user.id).following
  end
end
