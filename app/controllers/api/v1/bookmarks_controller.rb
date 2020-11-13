class Api::V1::BookmarksController < Api::V1::BaseController
  before_action :authenticate_user!
  # protect_from_forgery with: :null_session

  def create
    # binding.pry
    # token   = request.headers.fetch("Authorization", "").split(" ").last
    # payload = JWT.decode(token, nil, false)
    # @user = User.find(payload[0]["sub"])
    @bookmark = Bookmark.new(bookmark_params)
    authorize @bookmark
    @bookmark.save
    render json: {}
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @user = current_user
    @bookmark = Bookmark.find_by(user: @user, recipe: @recipe)
    # binding.pry
    authorize @bookmark
    @bookmark.destroy
    head :no_content
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:recipe_id, :user_id)
  end

end
