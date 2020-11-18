class Follow < ApplicationRecord
  belongs_to :follower, foreign_key: 'follower_id', class_name: 'User', touch: true
  belongs_to :following, foreign_key: 'following_id', class_name: 'User', touch: true
end
