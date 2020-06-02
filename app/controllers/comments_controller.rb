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
    # binding.pry
    # @comment.content = @comment.content.gsub(/http.*/) { |e| e.split(/\s/).map { |el| el.match?(/\Ahttp.*/) ? "[#{el.truncate(30)}](#{el})" : el }.join(' ') unless e.match?(/\[.+\)/) }
    #@comment.content = @comment.content.gsub(/http.+\s/) { |e| e.match(/http.+\)/) ? e : e.split(' ').map { |el| el.match(/http.+/) ? "[#{el.truncate(30)}](#{el})" : el }.join(/\s/) }
    authorize @comment
    @comment.recipe = @recipe
    @comment.user = current_user
    if @comment.content.match?(/https?/)
      @comment.spam = true
      # binding.pry
    end
    if @comment.save
      UserMailer.with(recipe: @recipe, comment: @comment).comment.deliver_later if @recipe.user.notification
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
    @recipe = @comment.recipe
  end

  def update
    @comment = Comment.find(params[:id])
    # @comment.content = @comment.content.gsub(/http.+/) { |e| e.match?(/http.+\)/) ? e : "[#{e.truncate(30)}](#{e})" }
    authorize @comment
    @recipe = @comment.recipe
    if @comment.update(comment_params)
      # redirect_to recipe_path(@recipe)
      respond_to do |format|
        # format.html { redirect_to recipe_path(@recipe) }
        format.html { render 'comments/show' }
        format.js  # <-- will render `app/views/comments/update.js.erb`
      end
    else
      # render :edit
      respond_to do |format|
        # format.html { redirect_to recipe_path(@recipe) }
        format.html { render 'comments/form' }
        format.js  # <-- will render `app/views/comments/update.js.erb`
      end
    end
  end

  def destroy
    # binding.pry
    # @admin = params[:admin] == 'true'
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @comment = Comment.find(params[:id])
    authorize @comment
    # redirect_to recipe_path(@recipe)
    if @comment.replies.any?
      @replies_spam = @comment.replies.select{ |reply| reply.spam }.map { |r| r }
    end
    @comment.destroy
    # binding.pry
    respond_to do |format|
      format.js
    end
  end

  private

  def spam
    @comment = Comment.find(params[:id])
    authorize @comment
    @comment.spam = false
    @comment.save
    respond_to do |format|
      format.js
    end
  end

  def set_admin
    @admin = current_user.admin
    @admin = false if @admin.nil?
    # binding.pry
  end

  def set_spam
    @spams = []
    comments = Comment.where(spam: true)
    @spams += comments.map { |message| message }
    replies = Reply.where(spam: true)
    @spams += replies.map { |message| message }
  end

  def comment_params
    params.require(:comment).permit(:content, :photo)
  end
end
