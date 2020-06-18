class Api::V1::UserController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]

  def index
    @user = policy_scope(User)
    @device = DeviceDetector.new(request.user_agent).device_type
  end

  # private

end
