class VueController < AppController
  skip_before_action :authenticate_user!, only: [:index]

  layout 'vue'

  def index
    @recipes = policy_scope(Recipe)
    if !params[:path].nil? && params[:path].match?(/^(?:r\/)(.+)/)
      # binding.pry
      @recipe = Recipe.find_by(slug: params[:path].match(/^(?:r\/)(.+)/)[1])
    end
    # binding.pry
    # @unsplash_images = policy_scope(UnsplashImage)

    # binding.pry

    @unsplash = Unsplash::Photo.search("cooking").sample
    @unsplash_image = UnsplashImage.new(
      image_id: @unsplash.id,
      image_urls_raw: @unsplash.urls.raw,
      image_links_download: @unsplash.links.download,
      image_user_name: @unsplash.user.name,
      image_user_username: @unsplash.user.username
    )
    @unsplash_image.save
  end

end
