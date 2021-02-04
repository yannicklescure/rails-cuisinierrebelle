namespace :refresh_cache do
  desc "This task refreshes all caches"
  task :generate => :environment do
    puts 'flushing the cache...'
    Rails.cache.clear
    puts 'refresh the cache...'
    CreateAnalyticsJsonCacheJob.perform_later
    CreatePagesJsonCacheJob.perform_later
    CreateRecipesJsonCacheJob.perform_later
    CreateUnsplashImagesJsonCacheJob.perform_later
    CreateUsersJsonCacheJob.perform_later
    puts "Done."
  end
end
