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
    binding.pry
    @user = params[:user] # Instance variable => available in view
    I18n.with_locale(@user.locale) do
      # mail(to: @user.email, subject: 'Bienvenue, cuisinier rebelle !')
      make_bootstrap_mail(to: @user.email, subject: 'Bienvenue, cuisinier rebelle !')
      # This will render a view in `app/views/user_mailer`!
    end
  end

  def comment
    # binding.pry
    @comment = params[:comment]
    I18n.with_locale(@comment.recipe.user.locale) do
      # mail(to: @recipe.user.email, subject: t('.subject', recipe: @recipe.title))
      make_bootstrap_mail(to: @comment.recipe.user.email, subject: t('.subject', recipe: @comment.recipe.title))
      # This will render a view in `app/views/comment`!
    end
  end

  def reply
    # binding.pry
    # @user = params[:user]
    # @recipe = params[:recipe]
    @reply = params[:reply]
    I18n.with_locale(@reply.comment.user.locale) do
      # mail(to: @user.email, subject: t('.subject', user: @reply.user.name))
      make_bootstrap_mail(to: @reply.comment.user.email, subject: t('.subject', user: @reply.user.name))
      # This will render a view in `app/views/reply`!
    end
  end

  def recipe
    @user = params[:user]
    @recipe = params[:recipe]
    # binding.pry
    I18n.with_locale(@user.locale) do
      # mail(to: @user.email, subject: t('.subject', author: @recipe.user.name))
      make_bootstrap_mail(to: @user.email, subject: t('.subject', author: @recipe.user.name))
      # This will render a view in `app/views/recipe`!
    end
  end
end
