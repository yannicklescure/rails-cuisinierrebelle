class Api::V1::StateController < Api::V1::BaseController
  before_action :authenticate_and_set_user, except: [ :index, :show ]
  before_action :process_token, only: [ :index, :show ]
  # before_action :authenticate_user!, except: [ :index, :show ]

  def index
    # binding.pry
    @user = policy_scope(User)
    @pages = Page.all
    if params[:query].present?
      if params[:query] === 'isAuthenticated'
        render json: {
          isAuthenticated: user_signed_in?
        }
      end
    else
      # @recipes = policy_scope(Recipe).includes([:user, :comments]).sort_by {|k,v| k.id}.reverse[0...24]
      @recipes = policy_scope(Recipe).includes([:user, :taggings])
      @users = User.all.includes([:follower_relationships, :followers, :following])
      force_update = 1606330015013
      @last_update = (Recipe.last.created_at.to_f * 1000).to_i
      @timestamp = @last_update < force_update ? force_update : @last_update
      json = Rails.cache.fetch(Recipe.cache_key(@recipes)) do
        MultiJson.dump({
          data: {
            isAuthenticated: user_signed_in?,
            lastUpdated: (Recipe.last.created_at.to_f * 1000).to_i,
            timestamp: @timestamp,
            recipes: @recipes.map { |recipe| {
                timestamp: (recipe.created_at.to_f * 1000).to_i,
                recipe: {
                  id: recipe.id,
                  slug: recipe.slug,
                  title: recipe.title,
                  subtitle: recipe.subtitle,
                  video: recipe.video,
                  direction: recipe.direction,
                  description: recipe.description,
                  tagList: recipe.tag_list,
                  likes: Like.where(recipe: recipe).count,
                  bookmarks: Bookmark.where(recipe: recipe).count,
                  views: recipe.views,
                  photo: {
                    card: {
                      url: recipe.photo.url(:card)
                    },
                    full: {
                      url: recipe.photo.url(:full)
                    },
                    openGraph: {
                      url: recipe.photo.url(:open_graph)
                    },
                    preview: {
                      url: recipe.photo.url(:preview)
                    },
                    thumb: {
                      url: recipe.photo.url(:thumb)
                    }
                  }
                },
                user: {
                  checked: recipe.user.checked,
                  id: recipe.user.id,
                  image: {
                    full: {
                      url: recipe.user.image.url(:full)
                    },
                    preview: {
                      url: recipe.user.image.url(:preview)
                    },
                    thumb: {
                      url: recipe.user.image.url(:thumb)
                    }
                  },
                  name: recipe.user.name,
                  slug: recipe.user.slug
                },
                comments: recipe.comments.includes([:user, :comment_likes]).map { |comment| {
                    id: comment.id,
                    likes: comment.comment_likes.length,
                    recipe: {
                      id: comment.recipe_id,
                    },
                    user: {
                      id: comment.user.id,
                      image: {
                        thumb: {
                          url: comment.user.image.url(:thumb)
                        }
                      },
                      name: comment.user.name,
                      slug: comment.user.slug,
                    },
                    content: comment.content,
                    timestamp: (comment.created_at.to_f * 1000).to_i,
                    replies: comment.replies.includes([:user, :reply_likes]).map { |reply| {
                        id: reply.id,
                        likes: reply.reply_likes.length,
                        commentId: reply.comment.id,
                        recipeId: recipe.id,
                        timestamp: (reply.created_at.to_f * 1000).to_i,
                        content: reply.content,
                        user: {
                          id: reply.user.id,
                          name: reply.user.name,
                          slug: reply.user.slug,
                          image: {
                            thumb: {
                              url: reply.user.image.url(:thumb)
                            }
                          }
                        },
                      }
                    }
                  }
                }
              }
            },
            users: [],
            # users: @users.map { |user| {
            #     id: user.id,
            #     slug: user.slug,
            #     name: user.name,
            #     checked: user.checked,
            #     followers: {
            #       count: user.followers.length,
            #       data: [],
            #     },
            #     following: {
            #       count: user.following.length,
            #       data: [],
            #     },
            #     image: {
            #       full: {
            #         url: user.image.url(:full)
            #       },
            #       preview: {
            #         url: user.image.url(:preview)
            #       },
            #       thumb: {
            #         url: user.image.url(:thumb)
            #       }
            #     },
            #   }
            # },
            pages: [],
            # pages: @pages.map { |page| {
            #     id: page.id,
            #     title: page.title,
            #     slug: page.slug,
            #     locale: page.locale,
            #     content: page.content,
            #   }
            # },
          }
        })
      end
      render json: json
    end
  end
end
