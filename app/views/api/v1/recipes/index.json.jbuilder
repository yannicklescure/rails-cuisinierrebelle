json.data do
  if user_signed_in?
    json.user do
      json.auth current_user, :email, :slug, :name, :checked
      json.auth do
        json.image do
          json.full do
            json.url current_user.image.url(:full)
          end
          json.preview do
            json.url current_user.image.url(:preview)
          end
          json.thumb do
            json.url current_user.image.url(:thumb)
          end
        end
      end
      # if current_user.likes.any?
        json.likes current_user.likes do |like|
          json.extract! like, :recipe_id
        end
      # end
      # if current_user.bookmarks.any?
        json.bookmarks do
          json.recipes do
            json.array! current_user.bookmarks.order('created_at DESC').map { |bookmark| Recipe.find(bookmark.recipe_id) }.each do |recipe|
              # json.extract! bookmark, :recipe_id, :created_at
              json.recipe do
                json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :likes_count
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
                # json.email recipe.user.email
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
            end
          end
        end
      # end
      # if current_user.recipes.any?
        json.recipes current_user.recipes do |recipe|
          # json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
          json.recipe recipe
        end
      # end
    end
  end
  json.recipes do
    json.array! @recipes do |recipe|
      json.recipe do
        json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :likes_count
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
      # json.extract! recipe
      # json.recipe recipe
      json.user do
        json.id recipe.user.id
        # json.email recipe.user.email
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
      if recipe.comments.any?
        json.comments recipe.comments do |comment|
          json.extract! comment, :id, :content
          if comment.replies.any?
            json.replies comment.replies do |reply|
              json.extract! reply, :id, :content
            end
          end
        end
      else
        json.comments []
      end
    end
  end

  json.users do
    json.array! @users do |user|
      json.extract! user, :id, :slug, :name
      json.recipes do
        json.array! user.recipes do |recipe|
          json.recipe do
            json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :likes_count
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
            json.id user.id
            # json.email recipe.user.email
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
        end
      end
    end
  end

  json.search do
    json.users do
      json.array! @search_users
    end
    json.recipes do
      json.array! @search_recipes do |recipe|
      json.recipe do
        json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :likes_count
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
      # json.extract! recipe
      # json.recipe recipe
      json.user do
        json.id recipe.user.id
        # json.email recipe.user.email
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
      if recipe.comments.any?
        json.comments recipe.comments do |comment|
          json.extract! comment, :id, :content
          if comment.replies.any?
            json.replies comment.replies do |reply|
              json.extract! reply, :id, :content
            end
          end
        end
      else
        json.comments []
      end
    end
    end
  end
end
