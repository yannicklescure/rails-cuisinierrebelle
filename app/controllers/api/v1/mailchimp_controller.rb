class Api::V1::MailchimpController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  acts_as_token_authentication_handler_for User
  before_action :set_user, only: [ :show, :update ]

  def show
  end

  def update
    user_subscription = params[:user_subscription] == 'true'
    # binding.pry
    if user_subscription
      MailchimpSubscribeUser.perform_later(@user)
      @user.mailchimp = true
      # render :update
    else
      MailchimpUnsubscribeUser.perform_later(@user)
      @user.mailchimp = false
    end
    @user.save
  end

  private

  def set_user
    @user = User.find(params[:id])
    authorize @user  # For Pundit
  end
end
