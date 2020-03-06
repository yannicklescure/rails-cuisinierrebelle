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
    mail(to: @recipe.user.email, subject: t('.subject', recipe: @recipe.title))
    # This will render a view in `app/views/comment`!
  end

  def reply
    @user = params[:user]
    @recipe = params[:recipe]
    @reply = params[:reply]
    mail(to: @user.email, subject: t('.subject', user: @reply.user.name))
    # This will render a view in `app/views/reply`!
  end

  def recipe
    @user = params[:user]
    @recipe = params[:recipe]
    mail(to: @user.email, subject: t('.subject', author: @recipe.user.name))
    # This will render a view in `app/views/recipe`!
  end
end
