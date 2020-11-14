class Api::V1::StateController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show ]

  def index
    # binding.pry
    @user = policy_scope(User)
    if params[:query].present?
      if params[:query] === 'isAuthenticated'
        render json: {
          isAuthenticated: user_signed_in?
        }
      end
    else
      # @recipes = policy_scope(Recipe).includes([:user, :comments]).sort_by {|k,v| k.id}.reverse[0...24]
      @recipes = policy_scope(Recipe).includes([:user, :comments])
      @users = User.all
      force_update = 1600607465638
      @last_update = (Recipe.last.created_at.to_f * 1000).to_i
      @timestamp = @last_update < force_update ? force_update : @last_update
      # request.env['HTTP_ACCEPT_ENCODING'] = 'gzip'
      render json: {
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
                likes: Like.where(recipe: recipe).count,
                bookmarks: Bookmark.where(recipe: recipe).count,
                views: RecipeLog.where(recipe: recipe).count,
                photo: {
                  card: {
                    url: recipe.photo.url(:card)
                  },
                  full: {
                    url: recipe.photo.url(:full)
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
              comments: recipe.comments.map { |comment| {
                  id: comment.id,
                  content: comment.content,
                  replies: comment.replies.map { |reply| {
                      id: reply.id,
                      content: reply.content
                    }
                  }
                }
              }
            }
          },
          users: @users.map { |user| {
              id: user.id,
              slug: user.slug,
              name: user.name,
              checked: user.checked,
              followers: user.followers.map{ |f| {
                  name: f.name,
                  slug: f.slug,
                  checked: f.checked,
                  image: {
                    thumb: {
                      url: f.image.url(:thumb)
                    }
                  }
                }
              },
              following: user.following.map{ |f| {
                  name: f.name,
                  slug: f.slug,
                  checked: f.checked,
                  image: {
                    thumb: {
                      url: f.image.url(:thumb)
                    }
                  }
                }
              },
              image: {
                full: {
                  url: user.image.url(:full)
                },
                preview: {
                  url: user.image.url(:preview)
                },
                thumb: {
                  url: user.image.url(:thumb)
                }
              },
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
                    likes: Like.where(recipe: recipe).count,
                    bookmarks: Bookmark.where(recipe: recipe).count,
                    views: RecipeLog.where(recipe: recipe).count,
                    photo: {
                      card: {
                        url: recipe.photo.url(:card)
                      },
                      full: {
                        url: recipe.photo.url(:full)
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
                  comments: recipe.comments.map { |comment| {
                      id: comment.id,
                      content: comment.content,
                      replies: comment.replies.map { |reply| {
                          id: reply.id,
                          content: reply.content
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    end
  end
end
