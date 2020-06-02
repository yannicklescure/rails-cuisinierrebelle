class AddPhotoToReplies < ActiveRecord::Migration[6.0]
  def change
    add_column :replies, :photo, :string
  end
end
