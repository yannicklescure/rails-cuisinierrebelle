class Product < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :photo, presence: true
  validates :url, url: true

  mount_uploader :photo, PhotoUploader
end
