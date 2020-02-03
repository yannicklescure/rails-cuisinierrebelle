namespace :sitemap do
  desc "This task is called by the Heroku scheduler add-on"
  task :generate => :environment do
    puts "Updating sitemap..."
    SitemapGenerator::Sitemap.default_host = "https://www.cuisinierrebelle.com/"
    SitemapGenerator::Sitemap.create do
      add root_path, :changefreq => 'daily'
      [nil, :en, :fr, :es].each do |locale|
        Recipe.find_each do |recipe|
          # binding.pry
          add recipe_path(recipe, :locale => locale), :changefreq => 'weekly', :lastmod => recipe.updated_at
        end
      end
    end
    puts "done."
  end
end
