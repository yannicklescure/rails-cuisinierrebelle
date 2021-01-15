class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def jwt_with_denylist_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_denylist_user!,
                only: :jwt_with_denylist_user_auth_action

  # clear_respond_to
  respond_to :json

  def new
    super
    # binding.pry
  end

  def create
    # binding.pry
    if (params[:authResponse])
      params['user']['password'] = ENV['FB_USER_PWD']
      params['user']['password_confirmation'] = ENV['FB_USER_PWD']
      # params['user']['first_name'] = params['user']['firstName']
      # params['user']['last_name'] = params['user']['lastName']
      # super
      build_resource(sign_up_params)

      accessToken = params[:authResponse][:accessToken]
      @facebook_user = Koala::Facebook::API.new(accessToken).get_object('/me?fields=first_name,last_name,email')
      resource.provider = 'facebook'
      resource.uid = @facebook_user['id']
      # resource.skip_confirmation!
      # binding.pry
      if resource.save
        # binding.pry
        # sign_in(:user, resource)
        # yield resource if block_given?
        # respond_with resource, location: after_sign_in_path_for(resource)
        # respond_login_with resource
        json_data = {
          authResponse: params[:authResponse],
          user: {
            first_name: @facebook_user['first_name'],
            last_name: @facebook_user['last_name'],
            email: @facebook_user['email']
          },
          isUser: !resource.nil?,
          isFacebookUser: resource.nil? ? false : !resource.provider.nil?
        }
        render json: MultiJson.dump(json_data)
      end
    else
      # super
      build_resource(sign_up_params)

      resource.save
      render json: MultiJson.dump({ message: 'Confirmation email sent.' })
      # render_resource(resource)
    end
  end

  def destroy
    # binding.pry
    async_update(resource)
    resource.destroy
    # Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    # set_flash_message! :notice, :destroyed
    # yield resource if block_given?
    # respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
    render json: MultiJson.dump({ message: 'User has been destroyed.' })
  end

  private

  def async_update(resource)
    # MailchimpUnsubscribeUser.perform_later(resource)
  end

  def edit_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end

  def sign_up_params
    # binding.pry
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params["user"]["name"] = "#{params["user"]["first_name"]} #{params["user"]["last_name"]}"
    params.require(:user).permit(:first_name, :last_name, :name, :email, :password, :password_confirmation, :current_password, :image, :locale)
  end

  def respond_login_with(resource, _opts = {})
    # binding.pry
    # resource.sessionIpAddress = request.remote_ip
    render json: MultiJson.dump({
      id: resource.id,
      email: resource.email,
      slug: resource.slug,
      first_name: resource.first_name,
      last_name: resource.last_name,
      name: resource.name,
      admin: resource.admin,
      authentication_token: resource.authentication_token,
      image: resource.image,
      checked: resource.checked,
      mailchimp: resource.mailchimp,
      notification: resource.notification,
      locale: resource.locale,
      moderator: resource.moderator,
      freemium: resource.freemium,
      # likes: Like.where(user_id: resource.id).map { |r| r.recipe_id },
      likes: Like.where(user_id: resource.id),
      commentLikes: CommentLike.where(user_id: resource.id).map { |r| r.comment_id },
      replyLikes: ReplyLike.where(user_id: resource.id).map { |r| r.reply_id },
      bookmarks: Bookmark.where(user_id: resource.id),
      followers: {
        count: resource.followers.length,
        data: resource.followers.map { |f| {
            name: f.name,
            slug: f.slug,
            checked: f.checked,
            image: {
              thumb: {
                url: f.image.url(:thumb)
              }
            }
          }
        },
      },
      following: {
        count: resource.following.length,
        data: resource.following.map { |f| {
            name: f.name,
            slug: f.slug,
            checked: f.checked,
            image: {
              thumb: {
                url: f.image.url(:thumb)
              }
            }
          }
        },
      },
    })
  end
end
