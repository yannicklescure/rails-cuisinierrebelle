class CreateRecipesJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    recipes = Recipe.includes([:user, :comments])
    timestamp = (Recipe.last.created_at.to_f * 1000).to_i
    Rails.cache.fetch(Recipe.cache_key(recipes)) do
      # recipes.to_json(include: :user, :comments)
      MultiJson.dump({
        data: {
          isAuthenticated: false,
          lastUpdated: timestamp,
          timestamp: timestamp,
          recipes: recipes.map { |recipe| {
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
                  preview: {
                    url: recipe.photo.url(:preview)
                  },
                  openGraph: {
                    url: recipe.photo.url(:open_graph)
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
                  replies: comment.replies.includes([:user]).map { |reply| {
                      id: reply.id,
                      likes: reply.reply_likes.length,
                      commentId: reply.comment.id,
                      recipeId: reply.comment.recipe.id,
                      timestamp: (reply.created_at.to_f * 1000).to_i,
                      content: reply.content,
                      user: {
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
          users: User.all.map { |user| {
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
            },
          },
          pages:Page.all.map { |page| {
              id: page.id,
              title: page.title,
              slug: page.slug,
              locale: page.locale,
              content: page.content,
            }
          },
        }
      })
    end
  end
end
