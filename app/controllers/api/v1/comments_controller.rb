class Api::V1::CommentsController < Api::V1::BaseController
  before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    # token   = request.headers.fetch("Authorization", "").split(" ").last
    # payload = JWT.decode(token, nil, false)
    # @user = User.find(payload[0]["sub"])
    @comment = Comment.new(comment_params)
    authorize @comment
    @comment.save
    render json: MultiJson.dump({
      id: @comment.id,
      recipe: {
        id: @comment.recipe_id,
      },
      user: {
        id: @comment.user_id,
        image: {
          thumb: {
            url: @comment.user.image.url(:thumb)
          }
        },
        name: @comment.user.name,
        slug: @comment.user.slug,
      },
      content: @comment.content,
      replies: [],
      timestamp: (@comment.created_at.to_f * 1000).to_i,
    })
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @user = current_user
    @comment = Comment.find_by(user: @user, recipe: @recipe)
    # binding.pry
    authorize @comment
    @comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.require(:comment).permit(:recipe_id, :user_id, :content)
  end

end
