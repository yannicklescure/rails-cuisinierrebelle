require 'json'

class Api::V1::FacebookController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  # before_action :authenticate_user!
  # before_action :set_user, only: [ :show, :update ]

  def index
    @users = policy_scope(User)
    # binding.pry
    params[:authResponse] = JSON.parse(params[:authResponse])
    @facebook_user = Koala::Facebook::API.new(params[:authResponse][:accessToken]).get_object('/me?fields=first_name,last_name,email')
    @user = User.find_by(email: @facebook_user['email'])
    json_data = {
      authResponse: params[:authResponse],
      user: {
        firstName: @facebook_user['first_name'],
        lastName: @facebook_user['last_name'],
        email: @facebook_user['email'],
      },
      isUser: !@user.nil?,
      isFacebookUser: @user.nil? ? false : !@user.provider.nil?
    }
    render json: MultiJson.dump(json_data)
  end

end
