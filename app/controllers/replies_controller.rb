class RepliesController < ApplicationController
  def new
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.find(params[:comment_id])
    @reply = Reply.new
  end

  def create
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.find(params[:comment_id])
    @user = current_user
    @reply = Reply.new(reply_params)
    # @reply.recipe = @recipe
    @reply.comment = @comment
    @reply.user = @user
    if @reply.save
      respond_to do |format|
        format.html { redirect_to recipe_path(@recipe) }
        format.js  # <-- will render `app/views/replys/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'replies/form' }
        format.js  # <-- idem
      end
    end
  end

  def edit
    @reply = Reply.find(params[:id])
  end

  def update
    @reply = Reply.find(params[:id])
    if @reply.update(reply_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @reply = Reply.find(params[:id])
    @reply.destroy
    redirect_to recipe_path(@recipe)
  end

  private
  def reply_params
    params.require(:reply).permit(:content)
  end
end
