class Recipe < ApplicationRecord

  belongs_to :user
  has_many :bookmarks, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :recipe_logs, dependent: :destroy

  def self.cache_key(recipes)
    {
      serializer: 'recipes',
      stat_record: recipes.maximum(:updated_at).to_i
    }
    # "recipes/#{ (recipes.maximum(:updated_at).to_f * 1000).to_i }"
  end

  mount_uploader :photo, PhotoUploader

  acts_as_taggable_on :tags

  # is_impressionable
  # is_impressionable counter_cache: true

  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true
  # validates :subtitle, presence: true
  # validates :description, presence: true
  validates :direction, presence: true
  validates :photo, presence: true
  validates :video, format: {
    with: /(^$|^.*@.*\..*$)|youtu.?be/,
    message: I18n.t(".only_allows_youtube_video")
  }

  # include PgSearch::Model
  # # PgSearch.multisearch_options = {
  # #   using: [:tsearch, :trigram],
  # #   ignoring: :accents
  # # }
  # multisearchable(
  #     against: [:title, :description, :direction, :tag_list],
  #     # update_if: [:description_changed?, :tag_list_changed?],
  #     # using: [:tsearch, :trigram, :dmetaphone]
  #     using: [:tsearch, :trigram]
  #   )
  searchkick

  before_save :sanitize_youtube_video_link
  before_commit :flush_cache!
  after_commit :create_json_cache
  # after_destroy :create_json_cache_after_destroy

  private

  def flush_cache!
    puts 'flushing the cache...'
    # Rails.cache.clear
    Rails.cache.delete Recipe.cache_key(Recipe.all)
    # Rails.cache.delete 'all_employees'
    # Rails.cache.delete "employees_#{gender}"
  end

  def sanitize_youtube_video_link
    # params_recipe_video = params[:recipe][:video]
    params_recipe_video = params_recipe_video == '' ? nil : self.video
    # binding.pry
    share_link = params_recipe_video.nil? ? nil : params_recipe_video.match(/(https?:\/\/.+\/)(.+(?=&)|.+)/)
    if share_link.nil?
      self.video = nil
    else
      if share_link[1].match?(/https:\/\/www.youtube.com\/embed\//)
        params_recipe_video = share_link[2]
      elsif share_link[1].match?(/(.*)(watch\?v=)(.+)/)
        params_recipe_video = share_link[2].match(/(watch\?v=)(.+)/)[2]
      elsif params_recipe_video.match(/(.+(?=\?))/)
        params_recipe_video = params_recipe_video.match(/(.+(?=\?))/)[1]
      elsif share_link[1].match?(/https:\/\/youtu.be\//)
        params_recipe_video = share_link[2]
      end
      # binding.pry
      self.video = "https://www.youtube.com/embed/#{ params_recipe_video }"
    end
  end

  # def create_json_cache_after_destroy
  #   # binding.pry
  #   recipe = Recipe.last
  #   recipe.updated_at = DateTime.now
  #   recipe.save
  #   create_json_cache
  # end

  def self.create_json_cache
    # binding.pry
    puts 'flushing the cache...'
    Rails.cache.delete Recipe.cache_key(Recipe.all)
    CreateRecipesJsonCacheJob.perform_later
  end

  def create_json_cache
    # binding.pry
    CreateRecipesJsonCacheJob.perform_later
  end

end
