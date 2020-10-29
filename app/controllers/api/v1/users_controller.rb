class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show ]

  def index
    @users = policy_scope(User)
    @device = DeviceDetector.new(request.user_agent).device_type
  end

  # private

end
