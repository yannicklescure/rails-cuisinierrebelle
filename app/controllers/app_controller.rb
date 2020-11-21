class AppController < ActionController::Base
  before_action :authenticate_user!, :set_locale
  include Pundit

  # def set_locale
  #   I18n.locale = params[:locale] || session[:locale] || I18n.default_locale
  #   session[:locale] = I18n.locale
  # end

  def set_locale
    # binding.pry
    # session[:locale] = params.fetch(:locale, I18n.default_locale).to_sym
    # https://github.com/iain/http_accept_language
    if session[:locale].nil?
      I18n.locale = http_accept_language.compatible_language_from(I18n.available_locales)
    else
      I18n.locale = session[:locale]
    end
    # session[:locale] = I18n.locale
  end

  def default_url_options(options = {})
    { locale: I18n.locale }.merge options
  end

  # Pundit: white-list approach.
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  # Uncomment when you *really understand* Pundit!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  private

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end
end
