class ReplyLike < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :reply, touch: true
end
