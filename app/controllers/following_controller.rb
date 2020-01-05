class FollowingController < ApplicationController
  def index
    @follows = current_user.following
  end
end
