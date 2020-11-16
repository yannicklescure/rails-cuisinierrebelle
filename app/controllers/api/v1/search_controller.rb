class Api::V1::SearchController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index ]

  def index
      @search_recipes = policy_scope(Recipe).search(params[:query])
      # binding.pry
      # @results = {
      #   user: @search_users.any? ? @search_users.map { |r| User.find(r.id) }.sort_by {|k,v| k.id}.reverse : [],
      #   recipe: @search_recipes.any? ? @search_recipes.map { |r| Recipe.find(r.id) }.sort_by {|k,v| k.id}.reverse : []
      # }
      render json: MultiJson.dump({
        recipes: @search_recipes.any? ? @search_recipes.map { |recipe| {
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
            comments: recipe.comments.includes(:replies).map { |comment| {
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
        } : []
        # }.sort_by {|k,v| k.id }.reverse : []
      })
  end

  # private

  # def search_params
  #   params.require(:search).permit(:query)
  # end

end


