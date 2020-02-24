class CommentsController < ApplicationController
  before_action :set_admin, :set_spam, only: [:destroy]

  def new
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.new
    authorize @comment
  end

  def create
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.new(comment_params)
    authorize @comment
    @comment.recipe = @recipe
    @comment.user = current_user
    if @comment.content.match?(/https?/)
      @comment.spam = true
      # binding.pry
    end
    if @comment.save
      respond_to do |format|
        # format.html { redirect_to recipe_path(@recipe) }
        format.html { render 'comments/show' }
        format.js  # <-- will render `app/views/comments/create.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'comments/form' }
        format.js  # <-- idem
      end
    end
    @reply = @comment.replies
  end

  def edit
    @comment = Comment.find(params[:id])
    authorize @comment
  end

  def update
    @comment = Comment.find(params[:id])
    authorize @comment
    if @comment.update(comment_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    # @admin = params[:admin] == 'true'
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @comment = Comment.find(params[:id])
    authorize @comment
    # redirect_to recipe_path(@recipe)
    # binding.pry
    if @comment.replies.any?
      @replies_spam = @comment.replies.map { |reply| reply if reply.spam }
    end
    @comment.destroy
    respond_to do |format|
      format.js
    end
  end

  def spam
    @comment = Comment.find(params[:id])
    authorize @comment
    @comment.spam = false
    @comment.save
    respond_to do |format|
      format.js
    end
  end

  private

  def set_admin
    @admin = current_user.admin
  end

  def set_spam
    @spams = []
    comments = Comment.where(spam: true)
    @spams += comments.map { |message| message }
    replies = Reply.where(spam: true)
    @spams += replies.map { |message| message }
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
