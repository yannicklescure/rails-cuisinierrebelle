class Api::V1::RepliesController < Api::V1::BaseController
  include Rails.application.routes.url_helpers

  before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    # token   = request.headers.fetch("Authorization", "").split(" ").last
    # payload = JWT.decode(token, nil, false)
    # @user = User.find(payload[0]["sub"])
    @reply = Reply.new(reply_params)
    authorize @reply
    if @reply.save
      # binding.pry
      UserMailer.with(reply: @reply).reply.deliver_later if @reply.comment.user.notification
    end
    render json: render_reply(@reply)
  end

  def update
    # binding.pry
    @reply = Reply.find(params[:id])
    authorize @reply
    if @reply.update(reply_params)
      # binding.pry
      # UserMailer.with(comment: @comment).comment.deliver_later if @comment.recipe.user.notification
    end
    render json: render_reply(@reply)
  end

  def destroy
    # binding.pry
    @reply = Reply.find(params[:id])
    authorize @reply
    @reply.destroy
    head :no_content
  end

  private

  def render_reply(reply)
    MultiJson.dump({
          id: reply.comment.id,
          recipe: {
            id: reply.comment.recipe_id,
          },
          user: {
            id: reply.comment.user_id,
            image: {
              thumb: {
                url: reply.comment.user.image.url(:thumb)
              }
            },
            name: reply.comment.user.name,
            slug: reply.comment.user.slug,
          },
          content: reply.comment.content,
          replies: reply.comment.replies.includes([:user]).map { |reply| {
              id: reply.id,
              commentId: reply.comment.id,
              recipeId: reply.comment.recipe.id,
              user: {
                id: reply.user_id,
                image: {
                  thumb: {
                    url: reply.user.image.url(:thumb)
                  }
                },
                name: reply.user.name,
                slug: reply.user.slug,
              },
              content: reply.content,
              timestamp: (reply.created_at.to_f * 1000).to_i,
            }
          },
          timestamp: (reply.comment.created_at.to_f * 1000).to_i,
        })
  end

  def reply_params
    params.require(:reply).permit(:recipe_id, :user_id, :comment_id, :content)
  end

end
