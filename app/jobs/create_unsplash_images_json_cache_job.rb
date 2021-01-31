class CreateUnsplashImagesJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    @unsplash_images = UnsplashImage.all
    @unsplash_image = @unsplash_images.last

    Rails.cache.fetch(UnsplashImage.cache_key(@unsplash_images)) do
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
  end
end
