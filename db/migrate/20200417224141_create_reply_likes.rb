class CreateReplyLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :reply_likes do |t|
      t.references :user, foreign_key: true
      t.references :reply, foreign_key: true

      t.timestamps
    end
  end
end
