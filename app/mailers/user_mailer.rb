class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  # def welcome
  #   @greeting = "Hi"

  #   mail to: "to@example.org"
  # end
  def welcome
    @user = params[:user] # Instance variable => available in view
    mail(to: @user.email, subject: 'Bienvenue, cuisinier rebelle !')
    # This will render a view in `app/views/user_mailer`!
  end

  def comment
    @recipe = params[:recipe]
    @comment = params[:comment]
    @url = root_url
    mail(to: @recipe.user.email, subject: "New comment on \"#{@recipe.title}\"")
    # This will render a view in `app/views/user_mailer`!
  end
end
