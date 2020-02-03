desc "This task is called by the Heroku scheduler add-on"
task :update_sitemap => :environment do
  puts "Updating sitemap..."
  heroku run rake sitemap:refresh
  puts "done."
end
