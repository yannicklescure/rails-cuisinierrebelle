class Api::V1::CommentLikesController < Api::V1::BaseController
  before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    @user = current_user
    params[:comment_like] = {
      user_id: @user.id,
      comment_id: params[:comment_id]
    }
    @comment_like = CommentLike.new(comment_like_params)
    authorize @comment_like
    @comment_like.save
    render json: MultiJson.dump({})
  end

  def destroy
    # binding.pry
    @comment = Comment.find(params[:comment_id])
    @user = current_user
    @comment_like = CommentLike.find_by(user: @user, comment: @comment)
    authorize @comment_like
    @comment_like.destroy unless @comment_like.nil?
    head :no_content
  end

  private

  def comment_like_params
    # binding.pry
    params.require(:comment_like).permit(:comment_id, :user_id)
  end

end
