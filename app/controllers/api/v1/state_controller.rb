class Api::V1::StateController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show ]

  def index
    # binding.pry
    if params[:query].present?
      if params[:query] === 'isAuthenticated'
        render json: {
          isAuthenticated: user_signed_in?
        }
      end
    end
    @recipes = policy_scope(Recipe)
    @user = policy_scope(User)
    @users = User.all
    force_update = 1600607465638
    @last_update = (Recipe.last.created_at.to_f * 1000).to_i
    @timestamp = @last_update < force_update ? force_update : @last_update
  end

end
