class Api::V1::RecipesController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :set_recipe, only: [ :show, :update ]

  def index
    # @recipes = policy_scope(Recipe).includes([:user, :comments]).sort_by {|k,v| k.id}.reverse[0...24]
    @recipes = policy_scope(Recipe).includes([:user])
    @users = User.all
    force_update = 1600607465638
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
              comments: recipe.comments.includes([:user, :replies]).map { |comment| {
                  id: comment.id,
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
                  replies: comment.replies.includes([:user]).map { |reply| {
                      id: reply.id,
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
          users: @users.map { |user| {
              id: user.id,
              slug: user.slug,
              name: user.name,
              checked: user.checked,
              followers: {
                count: user.followers.length,
                data: [],
              },
              following: {
                count: user.following.length,
                data: [],
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
            }
          }
        }
      })
    end
    render json: json
  end

  def show
    recipe = @recipe
    render json:  MultiJson.dump({
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
      comments: recipe.comments.includes([:user]).map { |comment| {
            id: comment.id,
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
            replies: comment.replies.includes([:user]).map { |reply| {
                id: reply.id,
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
    })
  end

  def update
    if @recipe.update(recipe_params)
      render :show
    else
      render_error
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :subtitle, :video, :direction, :description, :photo, :image, :tag_list)
  end

  def set_recipe
    # binding.pry
    @recipe = Recipe.includes([:user]).find_by(slug: params[:id])
    authorize @recipe  # For Pundit
  end
end
