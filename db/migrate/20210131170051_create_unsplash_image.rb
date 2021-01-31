class CreateUnsplashImage < ActiveRecord::Migration[6.0]
  def change
    create_table :unsplash_images do |t|
      t.string :image_id
      t.string :image_urls_raw
      t.string :image_links_download
      t.string :image_user_name
      t.string :image_user_username

      t.timestamps
    end
  end
end
