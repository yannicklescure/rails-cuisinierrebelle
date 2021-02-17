class Api::V1::ReplyLikesController < Api::V1::BaseController
  before_action :authenticate_and_set_user
  # before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    @user = current_user
    params[:reply_like] = {
      user_id: @user.id,
      reply_id: params[:reply_id]
    }
    @reply_like = ReplyLike.new(reply_like_params)
    authorize @reply_like
    @reply_like.save
    render json: MultiJson.dump({})
  end

  def destroy
    # binding.pry
    @reply = Reply.find(params[:reply_id])
    @user = current_user
    @reply_like = ReplyLike.find_by(user: @user, reply: @reply)
    authorize @reply_like
    @reply_like.destroy
    head :no_content
  end

  private

  def reply_like_params
    params.require(:reply_like).permit(:reply_id, :user_id)
  end

end
