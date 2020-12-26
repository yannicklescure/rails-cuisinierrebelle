class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def jwt_with_denylist_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_denylist_user!,
                only: :jwt_with_denylist_user_auth_action

  # clear_respond_to
  respond_to :json

  def new
    super
    # binding.pry
  end

  def create
    # super
    build_resource(sign_up_params)

    # binding.pry
    resource.save
    render json: MultiJson.dump({ message: 'Confirmation email sent.' })
    # render_resource(resource)
  end

  def destroy
    # binding.pry
    async_update(resource)
    resource.destroy
    # Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    # set_flash_message! :notice, :destroyed
    # yield resource if block_given?
    # respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
    render json: MultiJson.dump({ message: 'User has been destroyed.' })
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
