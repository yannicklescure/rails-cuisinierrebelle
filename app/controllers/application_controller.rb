class ApplicationController < ActionController::Base
  before_action :set_locale, :authenticate_user!

  def set_locale
    I18n.locale = params.fetch(:locale, I18n.default_locale).to_sym
    session[:locale] = I18n.locale
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end
end
