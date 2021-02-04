class Api::V1::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  # protect_from_forgery prepend: true
  # protect_from_forgery with: :null_session, prepend: true

  # protect_from_forgery :except => [:create]
  # before_action :verify_jwt_token

  respond_to :json

  def create
    # binding.pry
    # super
    # self.resource = warden.authenticate!(auth_options)
    self.resource = User.find_by(email: params[:user][:email])
    @facebookAuth = false
    if (!params[:authResponse].nil?)
      if resource.uid.nil?
        resource.uid = params[:authResponse][:userID]
        resource.provider = 'facebook'
        resource.save
      end
      params[:user][:password] = ENV['FB_USER_PWD']
      params[:session][:user][:password] = ENV['FB_USER_PWD']
      @facebookAuth = true
      # binding.pry
      sign_in(:user, resource)
      respond_with resource
    elsif resource.valid_password?(params[:user][:password])
      sign_in(:user, resource)
      # binding.pry
      respond_with resource
    else
      # binding.pry
      puts "Wrong password"
      render json: MultiJson.dump({ error: { password: true }})
    end
  end

  # def destroy
  #   # binding.pry
  #   puts resource
  #   super
  # end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  # def verify_jwt_token
  #   head :unauthorized if request.headers['Authorization'].nil? ||
  #     !AuthToken.valid?(request.headers['Authorization'].split(' ').last)
  # end

  def respond_with(resource, _opts = {})
    # binding.pry
    # resource.sessionIpAddress = request.remote_ip
    render json: MultiJson.dump({
      facebookAuth: @facebookAuth,
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

  def respond_to_on_destroy
    head :no_content
  end
end
