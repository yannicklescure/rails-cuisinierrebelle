require "base64"

class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :user_authentication, :set_locale
  # before_filter :set_locale # get locale directly from the user model

  include Pundit
  include HttpAcceptLanguage::AutoLocale

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?
  after_action :set_user_locale

  after_action :store_action

  # Uncomment when you *really understand* Pundit!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def user_not_authorized
    flash[:alert] = t(".you_are_not_authorized_to_perform_this_action")
    redirect_to(root_path)
  end

  # Redirecting back to the "current page"
  # https://github.com/heartcombo/devise/wiki/How-To:-Redirect-back-to-current-page-after-sign-in,-sign-out,-sign-up,-update
  def store_action
    return unless request.get?
    if (request.path != "/users/sign_in" &&
        request.path != "/users/sign_up" &&
        request.path != "/users/password/new" &&
        request.path != "/users/password/edit" &&
        request.path != "/users/confirmation" &&
        request.path != "/users/sign_out" &&
        !request.xhr?) # don't store ajax calls
      store_location_for(:user, request.fullpath)
    end
  end

  # def set_locale
  #   I18n.locale = user_signed_in? ? current_user.locale.to_sym : I18n.default_locale
  # end

  def set_locale
    # I18n.locale = params.fetch(:locale, I18n.default_locale).to_sym
    # binding.pry
    # https://github.com/iain/http_accept_language
    # binding.pry
    if session[:locale].nil?
      I18n.locale = http_accept_language.compatible_language_from(I18n.available_locales)
    else
      I18n.locale = session[:locale]
    end
    # session[:locale] = I18n.locale
  end

  def set_user_locale
    if user_signed_in?
      @user = current_user
      if @user.locale.nil?
        binding.pry
        @user.locale = params.fetch(:locale, I18n.default_locale).to_sym
        @user.save
      else
        I18n.locale = @user.locale
        session[:locale] = @user.locale
        # request.params[:locale] = @user.locale
        # respond_with resource, location: user_settings_path(resource, locale: resource.locale)
        # set_locale
      end
    end
  end

  def user_authentication
    if user_signed_in?
      cookies[:user_email] = Base64.encode64(current_user.email)
      cookies[:user_token] = Base64.encode64(current_user.authentication_token)
      cookies[:locale] = session[:locale]
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
