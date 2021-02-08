class Api::V1::UnsplashImagesController < Api::V1::BaseController

  def index
    @unsplash_images = policy_scope(UnsplashImage)

    # binding.pry

    # @unsplash = Unsplash::Photo.search("cooking").sample
    # @unsplash_image = UnsplashImage.new(
    #   image_id: @unsplash.id,
    #   image_urls_raw: @unsplash.urls.raw,
    #   image_links_download: @unsplash.links.download,
    #   image_user_name: @unsplash.user.name,
    #   image_user_username: @unsplash.user.username
    # )
    # @unsplash_image.save

    @unsplash_image = UnsplashImage.last

    json = Rails.cache.fetch(UnsplashImage.cache_key(@unsplash_images)) do
      # recipes.to_json(include: :user, :comments)
      MultiJson.dump({
        data: {
          bannerImage: {
            id: @unsplash_image.image_id,
            url: @unsplash_image.image_urls_raw,
            link: {
              download: @unsplash_image.image_links_download,
            },
            user: {
              name: @unsplash_image.image_user_name,
              username: @unsplash_image.image_user_username,
            }
          },
        }
      })
    end
    render json: json
  end

end
