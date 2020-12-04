class Api::V1::NotificationsController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :authenticate_user!

  def index
    # binding.pry
    @user = policy_scope(User).find(current_user.id)
    likes = @user.recipes.filter_map { |r| Like.find_by(recipe: r) }.map { |e| {
        user: User.find(e.user_id),
        recipe: Recipe.find(e.recipe_id),
        timestamp: (e.created_at.to_f * 1000).to_i
      }
    }.map { |e| {
        user: {
          name: e[:user].name.capitalize,
          slug: e[:user].slug,
          image: {
            thumb: {
              url: e[:user].image.thumb.url
            }
          }
        },
        title: e[:recipe].title,
        timestamp: e[:timestamp],
        type: 'recipe'
      }
    }

    commentLikes = @user.comments.filter_map { |r| CommentLike.find_by(comment: r) }.map { |e| {
        user: User.find(e.user_id),
        comment: Comment.find(e.comment_id),
        timestamp: (e.created_at.to_f * 1000).to_i
      }
    }.map { |e| {
        user: {
          name: e[:user].name.capitalize,
          slug: e[:user].slug,
          image: {
            thumb: {
              url: e[:user].image.thumb.url
            }
          }
        },
        title: e[:comment].content,
        timestamp: e[:timestamp],
        type: 'comment'
      }
    }

    replyLikes = @user.replies.filter_map { |r| ReplyLike.find_by(reply: r) }.map { |e| {
        user: User.find(e.user_id),
        reply: Reply.find(e.reply_id),
        timestamp: (e.created_at.to_f * 1000).to_i
      }
    }.map { |e| {
        user: {
          name: e[:user].name.capitalize,
          slug: e[:user].slug,
          image: {
            thumb: {
              url: e[:user].image.thumb.url
            }
          }
        },
        title: e[:reply].content,
        timestamp: e[:timestamp],
        type: 'reply'
      }
    }

    notifications = likes + commentLikes + replyLikes

    json = MultiJson.dump({
      # recipes: @user.following.filter_map { |u| Recipe.find_by(user: u) },
      # likes: likes,
      # commentLikes: commentLikes,
      # replyLikes: replyLikes,
      data: notifications
    })
    render json: json
  end
end
