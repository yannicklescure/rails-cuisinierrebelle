# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  # after_action :set_user_locale

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    # binding.pry
    I18n.locale = resource.locale.nil? ? session[:locale] : resource.locale
    session[:locale] = I18n.locale
  end

  # DELETE /resource/sign_out
  def destroy
    # binding.pry
    super
    session.delete :locale
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
