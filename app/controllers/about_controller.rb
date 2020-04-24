class AboutController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  before_action :set_user

  def index
    @about = policy_scope(About).find_by(user: @user)
    # binding.pry
    # authorize @user
  end

  def new
    @about = About.new
    authorize @about
  end

  def create
    @about = About.new(about_params)
    authorize @about
    @about.user = @user
    params[:about][:facebook] = sanitize_social_link(params[:about][:facebook], 'facebook') unless params[:about][:facebook].nil?
    params[:about][:instagram] = sanitize_social_link(params[:about][:instagram], 'instagram') unless params[:about][:instagram].nil?
    params[:about][:twitter] = sanitize_social_link(params[:about][:twitter], 'twitter') unless params[:about][:twitter].nil?
    params[:about][:youtube] = sanitize_social_link(params[:about][:youtube], 'youtube') unless params[:about][:youtube].nil?
    if @about.save
      redirect_to user_about_index_path(@user)
    else
      render :new
    end
  end

  def edit
    # binding.pry
    @about = About.find_by(user: @user)
    authorize @about
  end

  def update
    @about = About.find_by(user: @user)
    authorize @about
    params[:about][:facebook] = sanitize_social_link(params[:about][:facebook], 'facebook') unless params[:about][:facebook].nil?
    params[:about][:instagram] = sanitize_social_link(params[:about][:instagram], 'instagram') unless params[:about][:instagram].nil?
    params[:about][:twitter] = sanitize_social_link(params[:about][:twitter], 'twitter') unless params[:about][:twitter].nil?
    params[:about][:youtube] = sanitize_social_link(params[:about][:youtube], 'youtube') unless params[:about][:youtube].nil?
    if @about.update(about_params)
      # binding.pry
      # raise
      redirect_to user_about_index_path(@user)
    else
      # binding.pry
      render :edit
    end
  end

  private

  def set_user
    @user = User.friendly.find(params[:user_id])
  end

  def about_params
    params.require(:about).permit(:content, :facebook, :instagram, :twitter, :youtube)
  end

  def sanitize_social_link(url, social)
    if social == 'youtube'
      # https://www.youtube.com/channel/UCYVsOcXtLDkEZ38ASZpsSxQ/about
      # binding.pry
      if url.match(/(https?:\/\/)?(www.)?(youtube.com\/c\/)(.+)/)
        str = url.match(/(https?:\/\/)?(www.)?(youtube.com\/c\/)(.+)/)
        social_url = "#{social}.com/c"
      elsif url.match(/(https?:\/\/)?(www.)?(youtube.com\/channel\/)(.+\/)(.+)?/)
        str = url.match(/(https?:\/\/)?(www.)?(youtube.com\/channel\/)(.+\/)(.+)?/)
        social_url = "#{social}.com/channel"
      end
    else
      str = url.match(/(https?:\/\/)?(www.)?(#{social}.com\/)?(.+)/)
      social_url = "#{social}.com"
    end
    if str
      # binding.pry
      result = str[4]
      if result.match(/.*\/(.+)/)
        # binding.pry
        result = result.match(/.*\/(.+)/)[1]
      end
    end
    return "https://#{social_url}/#{result}"
  end
end
