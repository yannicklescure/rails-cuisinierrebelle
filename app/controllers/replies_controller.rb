class RepliesController < ApplicationController
  before_action :set_admin, :set_spam, only: [:destroy]

  def new
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.find(params[:comment_id])
    authorize @comment
    @reply = Reply.new
    authorize @reply
  end

  def create
    @recipe = Recipe.friendly.find(params[:recipe_id])
    authorize @recipe
    @comment = Comment.find(params[:comment_id])
    authorize @comment
    @reply = Reply.new(reply_params)
    authorize @reply
    # @reply.content = @reply.content.gsub(/http.*/) { |e| e.split(' ').map { |el| el.match(/http.*/) ? "[#{el.truncate(30)}](#{el})" : el }.join(' ') unless e.match(/\[(.+)\)$/) }
    # @reply.content = @reply.content.gsub(/http.+/) { |e| e.match?(/http.+\)/) ? e : "[#{e.truncate(30)}](#{e})" }
    # @reply.recipe = @recipe
    @reply.comment = @comment
    @reply.user = current_user
    if @reply.content.match?(/https?/)
      @reply.spam = true
      # binding.pry
    end
    if @reply.save
      users = []
      users << @reply.comment.user if @reply.comment.user != current_user
      @reply.comment.replies.each { |reply| users << reply.user unless users.include?(reply.user) || reply.user == current_user }
      # binding.pry
      users.each do |user|
        UserMailer.with(user: user, recipe: @recipe, reply: @reply).reply.deliver_now if user.notification
      end
      respond_to do |format|
        # format.html { redirect_to recipe_path(@recipe) }
        format.html { render 'replies/show' }
        format.js  # <-- will render `app/views/replies/create.js.erb`
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
    authorize @reply
    @recipe = @reply.comment.recipe
    # @reply.content = @reply.content.gsub(/http.*/) { |e| e.split(' ').map { |el| el.match(/http.*/) ? "[#{el.truncate(30)}](#{el})" : el }.join(' ') unless e.match(/\[(.+)\)$/) }
    # @reply.content = @reply.content.gsub(/http.+/) { |e| e.match?(/http.+\)/) ? e : "[#{e.truncate(30)}](#{e})" }
    if @reply.update(reply_params)
      respond_to do |format|
        # format.html { redirect_to recipe_path(@recipe) }
        format.html { render 'replies/show' }
        format.js  # <-- will render `app/views/replies/update.js.erb`
      end
    else
      respond_to do |format|
        format.html { render 'replies/form' }
        format.js  # <-- will render `app/views/replies/update.js.erb`
      end
    end
  end

  def destroy
    # @admin = params[:admin] == 'true'
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @comment = Comment.find(params[:comment_id])
    @reply = Reply.find(params[:id])
    # binding.pry
    authorize @reply
    if @reply.destroy
      # redirect_to recipe_path(@recipe)
      respond_to do |format|
        format.js
      end
    end
  end

  def spam
    @reply = Reply.find(params[:id])
    authorize @reply
    @reply.spam = false
    @reply.save
    respond_to do |format|
      format.js
    end
  end

  private

  def set_spam
    @spams = []
    comments = Comment.where(spam: true)
    @spams += comments.map { |message| message }
    replies = Reply.where(spam: true)
    @spams += replies.map { |message| message }
  end

  def set_admin
    @admin = current_user.admin
    @admin = false if @admin.nil?
    # binding.pry
  end

  def reply_params
    params.require(:reply).permit(:content)
  end
end
