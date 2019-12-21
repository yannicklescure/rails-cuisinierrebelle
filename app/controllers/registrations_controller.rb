class RegistrationsController < Devise::RegistrationsController
  private

  def sign_up_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation, :current_password)
  end
end
