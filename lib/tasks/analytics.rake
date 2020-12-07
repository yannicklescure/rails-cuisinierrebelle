namespace :analytics do
  desc "This task calls Google Analytics API"
  task :generate => :environment do
    puts "Updating analytics..."
    GoogleAnalyticsReport.new
    puts "Done."
  end
end
