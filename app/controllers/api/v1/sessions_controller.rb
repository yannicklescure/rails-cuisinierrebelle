class Api::V1::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  # protect_from_forgery prepend: true
  # protect_from_forgery with: :null_session, prepend: true

  # protect_from_forgery :except => [:create]
  # before_action :verify_jwt_token

  respond_to :json

  # def create
  #   super
  #   # binding.pry
  # end

  # def destroy
  #   # binding.pry
  #   puts resource
  #   super
  # end

  private

  # def verify_jwt_token
  #   head :unauthorized if request.headers['Authorization'].nil? ||
  #     !AuthToken.valid?(request.headers['Authorization'].split(' ').last)
  # end

  def respond_with(resource, _opts = {})
    # binding.pry
    # resource.sessionIpAddress = request.remote_ip
    render json: {
      "id": resource.id,
      "email": resource.email,
      # "created_at": "2020-05-24T16:04:07.878Z",
      # "updated_at": "2020-10-19T01:26:01.991Z",
      "slug": resource.slug,
      "first_name": resource.first_name,
      "last_name": resource.last_name,
      "name": resource.name,
      "admin": resource.admin,
      "authentication_token": resource.authentication_token,
      # "provider": null,
      # "uid": null,
      "image": resource.image,
      "checked": resource.checked,
      "mailchimp": resource.mailchimp,
      "notification": resource.notification,
      "locale": resource.locale,
      "moderator": resource.moderator,
      "freemium": resource.freemium,
      "likes": Like.where(user_id: resource.id),
      "bookmarks": Bookmark.where(user_id: resource.id),
    }
  end

  def respond_to_on_destroy
    head :no_content
  end
end
