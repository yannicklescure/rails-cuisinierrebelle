# Source: https://github.com/heartcombo/devise/blob/master/app/controllers/devise/registrations_controller.rb
# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  def edit
    @bookmarks = Bookmark.where(user: current_user)
    super
  end

  # PUT /resource
  # def update
  #   super
  # end

  def update
    # binding.pry
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?

      # binding.pry
      if I18n.available_locales.include?(params[:user][:locale].to_sym)
        resource.locale = params[:user][:locale]
      end
      resource.slug = nil
      resource.save!

      # binding.pry

      # resource.slug.gsub!(/\W/,'')
      # resource.save!

      # respond_with resource, location: after_update_path_for(resource)
      # respond_with resource, location: user_path(resource)
      # I18n.with_locale(locale, &action)

      # params[:locale] = resource.locale
      # session[:locale] = resource.locale
      # I18n.locale = resource.locale

      # binding.pry
      respond_with resource, location: user_settings_path(resource, locale: resource.locale)
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  def destroy
    async_update(resource)
    resource.destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message! :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  # def update
  #   binding.pry
  #   super
  #   redirect_to user_path(resource)
  # end

  def update_resource(resource, params)
    # resource.update_without_password(params)
    if resource.provider == "facebook"
      # binding.pry
      params.delete("current_password")
      resource.update_without_password(edit_params)
    else
      # binding.pry
      # resource.update_with_password(edit_params)
      super
    end
  end

  private

  def async_update(resource)
    MailchimpUnsubscribeUser.perform_later(resource)
  end

  def edit_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end

  def sign_up_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end
end
