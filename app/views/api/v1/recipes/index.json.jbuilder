json.data do
  json.isAuthenticated user_signed_in?
  json.lastUpdated (Recipe.last.created_at.to_f * 1000).to_i
  json.timestamp @timestamp

  json.recipes do
    json.array! @recipes do |recipe|
      json.timestamp (recipe.created_at.to_f * 1000).to_i
      json.recipe do
        json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description
        json.likes Like.where(recipe: recipe).count
        json.bookmarks Bookmark.where(recipe: recipe).count
        json.views RecipeLog.where(recipe: recipe).count
        json.photo do
          json.card do
            json.url recipe.photo.url(:card)
          end
          json.full do
            json.url recipe.photo.url(:full)
          end
          json.preview do
            json.url recipe.photo.url(:preview)
          end
          json.thumb do
            json.url recipe.photo.url(:thumb)
          end
        end
      end
      json.user do
        json.id recipe.user.id
        json.slug recipe.user.slug
        json.name recipe.user.name
        json.image do
          json.full do
            json.url recipe.user.image.url(:full)
          end
          json.preview do
            json.url recipe.user.image.url(:preview)
          end
          json.thumb do
            json.url recipe.user.image.url(:thumb)
          end
        end
        json.checked recipe.user.checked
      end
      # if recipe.comments.any?
      #   json.comments recipe.comments do |comment|
      #     json.extract! comment, :id, :content
      #     if comment.replies.any?
      #       json.replies comment.replies do |reply|
      #         json.extract! reply, :id, :content
      #       end
      #     end
      #   end
      # else
      #   json.comments []
      # end
      json.comments []
    end
  end

  json.users do
    json.array! @users do |user|
      json.extract! user, :id, :slug, :name, :checked
      json.followers []
      # json.followers user.followers.map{ |f| {
      #     name: f.name,
      #     slug: fjson.followers.slug,
      #     checked: f.checked,
      #     image: {
      #       thumb: {
      #         url: f.image.url(:thumb)
      #       }
      #     }
      #   }
      # }
      json.following []
      # json.following user.following.map{ |f| {
      #     name: f.name,
      #     slug: f.slug,
      #     checked: f.checked,
      #     image: {
      #       thumb: {
      #         url: f.image.url(:thumb)
      #       }
      #     }
      #   }
      # }
      json.image do
        json.full do
          json.url user.image.url(:full)
        end
        json.preview do
          json.url user.image.url(:preview)
        end
        json.thumb do
          json.url user.image.url(:thumb)
        end
      end
      # json.recipes do
      #   json.array! user.recipes do |recipe|
      #     json.recipe do
      #       json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description
      #       # json.likesCount recipe.likes_count
      #       json.likes Like.where(recipe: recipe).count
      #       json.bookmarks Bookmark.where(recipe: recipe).count
      #       # json.views_count recipe.impressionist_count(:filter=>:session_hash)
      #       json.views RecipeLog.where(recipe: recipe).count
      #       json.photo do
      #         json.card do
      #           json.url recipe.photo.url(:card)
      #         end
      #         json.full do
      #           json.url recipe.photo.url(:full)
      #         end
      #         json.preview do
      #           json.url recipe.photo.url(:preview)
      #         end
      #         json.thumb do
      #           json.url recipe.photo.url(:thumb)
      #         end
      #       end
      #     end
      #     json.user do
      #       json.id user.id
      #       json.slug recipe.user.slug
      #       json.name recipe.user.name
      #       json.image do
      #         json.full do
      #           json.url recipe.user.image.url(:full)
      #         end
      #         json.preview do
      #           json.url recipe.user.image.url(:preview)
      #         end
      #         json.thumb do
      #           json.url recipe.user.image.url(:thumb)
      #         end
      #       end
      #       json.checked recipe.user.checked
      #     end
      #   end
      # end
    end
  end

  # json.search do
  #   json.users do
  #     json.array! @search_users
  #   end
  #   json.recipes do
  #     json.array! @search_recipes do |recipe|
  #     json.recipe do
  #       json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description
  #       # json.likesCount recipe.likes_count
  #       json.likes Like.where(recipe: recipe).count
  #       json.bookmarks Bookmark.where(recipe: recipe).count
  #       # json.views_count recipe.impressionist_count(:filter=>:session_hash)
  #       json.views RecipeLog.where(recipe: recipe).count
  #       json.photo do
  #         json.card do
  #           json.url recipe.photo.url(:card)
  #         end
  #         json.full do
  #           json.url recipe.photo.url(:full)
  #         end
  #         json.preview do
  #           json.url recipe.photo.url(:preview)
  #         end
  #         json.thumb do
  #           json.url recipe.photo.url(:thumb)
  #         end
  #       end
  #     end
  #     json.user do
  #       json.id recipe.user.id
  #       json.slug recipe.user.slug
  #       json.name recipe.user.name
  #       json.image do
  #         json.full do
  #           json.url recipe.user.image.url(:full)
  #         end
  #         json.preview do
  #           json.url recipe.user.image.url(:preview)
  #         end
  #         json.thumb do
  #           json.url recipe.user.image.url(:thumb)
  #         end
  #       end
  #       json.checked recipe.user.checked
  #     end
  #     if recipe.comments.any?
  #       json.comments recipe.comments do |comment|
  #         json.extract! comment, :id, :content
  #         if comment.replies.any?
  #           json.replies comment.replies do |reply|
  #             json.extract! reply, :id, :content
  #           end
  #         end
  #       end
  #     else
  #       json.comments []
  #     end
  #   end
  #   end
  # end
end
