class CommentsController < ApplicationController
  def new
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.new
  end

  def create
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @user = current_user
    @comment = Comment.new(comment_params)
    @comment.recipe = @recipe
    @comment.user = @user
    if @comment.save
      respond_to do |format|
        format.html { redirect_to recipe_path(@recipe) }
        format.js  # <-- will render `app/views/comments/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'comments/form' }
        format.js  # <-- idem
      end
    end
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to recipe_path(@recipe)
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end
