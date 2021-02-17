class Api::V1::CommentsController < Api::V1::BaseController
  include Rails.application.routes.url_helpers

  before_action :authenticate_and_set_user
  # before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    # token   = request.headers.fetch("Authorization", "").split(" ").last
    # payload = JWT.decode(token, nil, false)
    # @user = User.find(payload[0]["sub"])
    @comment = Comment.new(comment_params)
    authorize @comment
    if @comment.save
      # binding.pry
      UserMailer.with(comment: @comment).comment.deliver_later if @comment.recipe.user.notification
    end
    render json: render_comment(@comment)
  end

  def update
    # binding.pry
    @comment = Comment.find(params[:id])
    authorize @comment
    if @comment.update(comment_params)
      # binding.pry
      # UserMailer.with(comment: @comment).comment.deliver_later if @comment.recipe.user.notification
    end
    render json: render_comment(@comment)
  end

  def destroy
    # binding.pry
    @comment = Comment.find(params[:id])
    authorize @comment
    @comment.destroy
    head :no_content
  end

  private

  def render_comment(comment)
    MultiJson.dump({
          id: comment.id,
          likes: comment.comment_likes.length,
          recipe: {
            id: comment.recipe_id,
          },
          user: {
            id: comment.user_id,
            image: {
              thumb: {
                url: comment.user.image.url(:thumb)
              }
            },
            name: comment.user.name,
            slug: comment.user.slug,
          },
          content: comment.content,
          replies: comment.replies.includes([:user]).map { |reply| {
            id: reply.id,
            likes: reply.reply_likes.length,
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
          }},
          timestamp: (comment.created_at.to_f * 1000).to_i,
        })
  end

  def comment_params
    params.require(:comment).permit(:recipe_id, :user_id, :content)
  end

end
