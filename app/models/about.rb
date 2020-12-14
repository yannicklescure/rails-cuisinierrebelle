class About < ApplicationRecord
  belongs_to :user

  # validates :content, presence: true
  # validates :facebook, format: {
  #   with: /(https?:\/\/)?(www.)?(facebook.com\/)?(.+)/,
  #   message: I18n.t(".only_allows_url")
  # }
  # validates :instagram, format: {
  #   with: /(https?:\/\/)?(www.)?(instagram.com\/)?(.+)/,
  #   message: I18n.t(".only_allows_url")
  # }
  # validates :twitter, format: {
  #   with: /(https?:\/\/)?(www.)?(twitter.com\/)?(.+)/,
  #   message: I18n.t(".only_allows_url")
  # }
  # validates :youtube, format: {
  #   with: /(https?:\/\/)?(www.)?(youtube.com\/channel\/)?(.+)/,
  #   message: I18n.t(".only_allows_url")
  # }

  after_save :create_json_cache

  private

  def create_json_cache
    CreateUsersJsonCacheJob.perform_later
  end
end
