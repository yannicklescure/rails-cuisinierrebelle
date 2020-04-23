class AboutController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    # binding-pry
    @about = policy_scope(User)
    @user = User.friendly.find(params[:user_id])
    # authorize @user
  end
end
