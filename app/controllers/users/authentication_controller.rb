module Users
  class AuthenticationController < ApiGuard::AuthenticationController
    # before_action :find_resource, only: [:create]
    # before_action :authenticate_resource, only: [:destroy]

    def create
      # binding.pry
      if resource.authenticate(params[:password])
        create_token_and_set_header(resource, resource_name)
        # render_success(message: I18n.t('api_guard.authentication.signed_in'))
        respond_with(resource)
      else
        render_error(422, message: I18n.t('api_guard.authentication.invalid_login_credentials'))
      end
    end

    def destroy
      blacklist_token
      # render_success(message: I18n.t('api_guard.authentication.signed_out'))
      json = {}
      render json: json
    end

    private

    # def find_resource
    #   self.resource = resource_class.find_by(email: params[:email].downcase.strip) if params[:email].present?
    #   render_error(422, message: I18n.t('api_guard.authentication.invalid_login_credentials')) unless resource
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
  end
end
