class Api::V1::NotificationsController < Api::V1::BaseController
  # acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :authenticate_and_set_user
  # before_action :authenticate_user!

  def index
    # binding.pry
    @user = policy_scope(User).find(current_user.id)
    likes = Like.where(recipe: @user.recipes).reject { |s| s.user_id == current_user.id }.map { |e| {
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
        slug: "/r/#{e[:recipe].slug}",
        timestamp: e[:timestamp],
        type: 'recipe'
      }
    }

    commentLikes = CommentLike.where(comment: @user.comments).reject { |s| s.user_id == current_user.id }.map { |e| {
        user: User.find(e.user_id),
        comment: Comment.find(e.comment_id),
        recipe: Comment.find(e.comment_id).recipe,
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
        slug: "/r/#{e[:recipe].slug}#comment#{e[:comment].id}",
        timestamp: e[:timestamp],
        type: 'comment'
      }
    }

    replyLikes = ReplyLike.where(reply: @user.replies).reject { |s| s.user_id == current_user.id }.map { |e| {
        user: User.find(e.user_id),
        reply: Reply.find(e.reply_id),
        recipe: Reply.find(e.reply_id).comment.recipe,
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
        slug: "/r/#{e[:recipe].slug}#reply#{e[:reply].id}",
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
