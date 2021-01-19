require 'digest'

class Api::V1::PasswordController < Api::V1::BaseController
  respond_to :json

  def reset_user_password_verification
    # binding.pry
    @token = params[:user][:token]
    @user = User.find_by(password_reset_timestamp: @token)
    if @user.nil?
      puts "User not found"
      json_data = MultiJson.dump({
        user: {
          firstName: nil,
          email: nil,
          token: nil
        }
      })

      render json: json_data
    else
      authorize @user
      json_data = MultiJson.dump({
        user: {
          firstName: @user.first_name,
          email: @user.email,
          token: @token
        }
      })

      render json: json_data
    end
  end

  def reset_user_password
    # binding.pry
    @email = params[:user][:email]
    @user = User.find_by(email: @email)
    authorize @user
    if (@user.password_reset_timestamp === params[:user][:token])
      if (params[:user][:password] === params[:user][:confirmation])
        @user.password = params[:user][:password]
        if @user.save
          render json: { success: true }
        else
          render json: { success: false }
        end
      end
    end
  end

  def request_user_password_reset
    # binding.pry
    @email = params[:user][:email]
    @user = User.find_by(email: @email)
    if @user.nil?
      puts "User not found"
      json_data = MultiJson.dump({
        user: {
          email: nil,
          token: nil
        }
      })

      render json: json_data
    else
      authorize @user
      @token = Digest::SHA256.hexdigest(DateTime.now.strftime('%Q'))
      @user.password_reset_timestamp = @token
      @user.save

      json_data = MultiJson.dump({
        user: {
          email: @email,
          token: @token
        }
      })

      UserMailer.with(user: @user, token: @token).reset_user_password.deliver_now
      render json: json_data
    end
  end
end
