class LikesController < ApplicationController
  def update
    @recipe = Recipe.friendly.find(params[:recipe_id])
    @liked = false
    # binding.pry
    @params = params
    if params[:reply_id]
      @reply = Reply.find(params[:reply_id])
      @like = ReplyLike.find_by(user: current_user, reply: @reply)
      # binding.pry
      if @like
        @like.destroy
        @reply_liked = false
      else
        @like = ReplyLike.create(user: current_user, reply: @reply)
        @reply_liked = true
      end
      @reply_likes = @reply.reply_likes.count
      respond_to do |format|
        format.js
      end
    elsif params[:comment_id]
      @comment = Comment.find(params[:comment_id])
      @like = CommentLike.find_by(user: current_user, comment: @comment)
      # binding.pry
      if @like
        @like.destroy
        @comment_liked = false
      else
        @like = CommentLike.create(user: current_user, comment: @comment)
        @comment_liked = true
      end
      @comment_likes = @comment.comment_likes.count
      respond_to do |format|
        format.js
      end
    else
      @like = Like.find_by(user: current_user, recipe: @recipe)
      if @like
        @like.destroy
        @liked = false
      else
        @like = Like.create(user: current_user, recipe: @recipe)
        @liked = true
      end
      # @likes = Like.where(user: current_user, recipe: @recipe)
      @recipe.likes_count = @recipe.likes.count
      @recipe.save
      respond_to do |format|
        format.js
      end
    end
    # authorize @recipe
    # authorize @like unless @like.nil?
    authorize @like
  end
end
