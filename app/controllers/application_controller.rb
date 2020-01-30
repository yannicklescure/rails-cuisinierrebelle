require "base64"

class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :set_locale, :user_authentication

  include Pundit

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  # Uncomment when you *really understand* Pundit!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def user_not_authorized
    flash[:alert] = t(".you_are_not_authorized_to_perform_this_action")
    redirect_to(root_path)
  end

  def set_locale
    # I18n.locale = params.fetch(:locale, I18n.default_locale).to_sym
    I18n.locale = params[:locale] || session[:locale] || I18n.default_locale
    session[:locale] = I18n.locale
  end

  def user_authentication
    if user_signed_in?
      cookies[:user_email] = Base64.encode64(current_user.email)
      cookies[:user_token] = Base64.encode64(current_user.authentication_token)
    end
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end

  private

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end
end
