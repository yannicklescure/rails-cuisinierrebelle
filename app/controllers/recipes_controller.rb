class RecipesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]

  layout 'application'

  def index
    # @recipes = Recipe.where(user: current_user)
    @recipes = policy_scope(Recipe).where(user: current_user)
    @bookmarks = Bookmark.where(user: current_user)
  end

  def show
    # @recipe = Recipe.find(params[:id])
    @recipe = Recipe.friendly.find(params[:id])
    @related_recipes = @recipe.find_related_tags
    authorize @recipe
    @bookmark = Bookmark.find_by(user: current_user, recipe: @recipe)
    @bookmarks = Bookmark.where(user: current_user)
    @like = Like.find_by(user: current_user, recipe: @recipe)
    @likes = Like.where(user: current_user, recipe: @recipe)
    @comment = Comment.new
    render layout: 'recipes'
  end

  def new
    @recipe = Recipe.new
    authorize @recipe
    @bookmarks = Bookmark.where(user: current_user)
  end

  def create
    @bookmarks = Bookmark.where(user: current_user)
    @recipe = Recipe.new(recipe_params)
    authorize @recipe
    @recipe.user = current_user
    params[:recipe][:video] = sanitize_youtube_video_link(params[:recipe][:video])
    if @recipe.save
      @recipe.video = nil if @recipe.video == ''
      @recipe.save
      redirect_to recipe_path(@recipe)
    else
      render :new
    end
  end

  def edit
    @recipe = Recipe.friendly.find(params[:id])
    authorize @recipe
    @bookmarks = Bookmark.where(user: current_user)
  end

  def update
    @bookmarks = Bookmark.where(user: current_user)
    @recipe = Recipe.friendly.find(params[:id])
    authorize @recipe
    params[:recipe][:video] = sanitize_youtube_video_link(params[:recipe][:video])
    if @recipe.update(recipe_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    @admin = params[:admin] == 'true'
    @recipe = Recipe.friendly.find(params[:id])
    authorize @recipe
    @recipe.remove_photo
    @recipe.save
    @recipe.destroy
    if @admin
      respond_to do |format|
        format.js
      end
    else
      redirect_to recipes_path
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :subtitle, :video, :direction, :description, :photo, :image, :tag_list)
  end

  def sanitize_youtube_video_link(params_recipe_video)
    # params_recipe_video = params[:recipe][:video]
    if params_recipe_video.match?(/(https?:\/\/.+\/)(.+(?=&)|.+)/)
      share_link = params_recipe_video.match(/(https?:\/\/.+\/)(.+(?=&)|.+)/)
      if share_link.nil?
        return nil
      else
        params_recipe_video = share_link[2] if share_link[1].match?(/https:\/\/youtu.be\//)
        if share_link[1].match?(/https:\/\/www.youtube.com\//)
          params_recipe_video = share_link[2].match(/(watch\?v=)(.+)/)[2]
        end
        params_recipe_video = params_recipe_video.match(/(.+(?=\?))/)[1] if params_recipe_video.match(/(.+(?=\?))/)
        # binding.pry
        return "https://youtu.be/#{params_recipe_video}"
      end
    else
      return nil
    end
  end
end
