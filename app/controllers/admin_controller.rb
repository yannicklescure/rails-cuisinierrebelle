class AdminController < ApplicationController

  def index
    # @users = User.where.not(id: current_user.id)
    @users = policy_scope(User).where.not(id: current_user.id)
  end

end
