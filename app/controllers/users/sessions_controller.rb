# Source: https://github.com/heartcombo/devise/blob/master/app/controllers/devise/sessions_controller.rb
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
    # binding.pry
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    after_sign_in_path = after_sign_in_path_for(resource)
    current_locale = after_sign_in_path.match(/\/(en|fr|es)?.*/)[1] || I18n.default_locale
    if I18n.available_locales.include?(current_locale.to_sym)
      after_sign_in_path = after_sign_in_path.gsub(/#{current_locale}/, resource.locale)
    end
    # binding.pry
    respond_with resource, location: after_sign_in_path
    # respond_with resource, location: current_page_params.merge(locale: resource.locale)
    # respond_with resource, location: root_path(locale: resource.locale)
  end

  # DELETE /resource/sign_out
  def destroy
    # binding.pry
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    session.delete :locale
    respond_to_on_destroy
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def after_sign_in_path_for(resource)
    # binding.pry
    if resource.is_a?(User) && resource.locale.to_sym !=  I18n.locale
      I18n.locale = resource.locale.to_sym # no strings accepted
      session[:locale] = I18n.locale
    end
    super
  end

  def respond_to_on_destroy
    # We actually need to hardcode this as Rails default responder doesn't
    # support returning empty response on GET request
    respond_to do |format|
      format.js
      format.all { head :no_content }
      format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name) }
    end
  end
end
