class UnsplashImage < ApplicationRecord

  def self.cache_key(unsplash_images)
    {
      serializer: 'unsplash_image',
      stat_record: unsplash_images.maximum(:updated_at)
    }
  end

  after_commit :flush_cache!
  after_save :create_json_cache

  private

  def flush_cache!
    puts 'flushing the cache...'
    Rails.cache.delete UnsplashImage.cache_key(UnsplashImage.all)
    # Rails.cache.delete 'all_employees'
    # Rails.cache.delete "employees_#{gender}"
  end

  def create_json_cache
    CreateUnsplashImagesJsonCacheJob.perform_later
  end
end
