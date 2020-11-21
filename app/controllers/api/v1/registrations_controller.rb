class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, :only => :create

  # clear_respond_to
  respond_to :json

  def new
    super
    # binding.pry
  end

  def create
    # binding.pry
    # super
    build_resource(sign_up_params)

    resource.save
    render json: MultiJson.dump({ message: 'Confirmation email sent.' })
    # render_resource(resource)
  end

  private

  def async_update(resource)
    # MailchimpUnsubscribeUser.perform_later(resource)
  end

  def edit_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end

  def sign_up_params
    # binding.pry
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end
end
