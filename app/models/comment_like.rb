class CommentLike < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :comment, touch: true
end
