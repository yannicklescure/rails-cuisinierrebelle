class Api::V1::NotificationsController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :authenticate_user!

  def index
    @user = current_user
    json = MultiJson.dump({
      recipe: @user.following.filter_map { |u| Recipe.find_by(user: u) },
      likes: @user.recipes.filter_map { |r| Like.find_by(recipe: r) }.map { |e| {
          user: User.find(e.user_id),
          recipe: Recipe.find(e.recipe_id)
        }
      },
      commentLikes: @user.comments.filter_map { |r| CommentLike.find_by(comment: r) }.map { |e| {
          user: User.find(e.user_id),
          comment: Comment.find(e.comment_id)
        }
      },
      replyLikes: @user.replies.filter_map { |r| ReplyLike.find_by(reply: r) }.map { |e| {
          user: User.find(e.user_id),
          reply: Reply.find(e.reply_id)
        }
      },
    })
    render json: json
  end
end
