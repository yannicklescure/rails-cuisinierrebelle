json.data do
  if user_signed_in?
    json.user do
      json.auth current_user, :email, :slug
      if current_user.likes.any?
        json.likes current_user.likes do |like|
          json.extract! like, :recipe_id
        end
      end
      if current_user.bookmarks.any?
        json.bookmarks current_user.bookmarks.order('created_at DESC') do |bookmark|
          json.extract! bookmark, :recipe_id, :created_at
        end
      end
      if current_user.recipes.any?
        json.recipes current_user.recipes do |recipe|
          json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
        end
      end
    end
  end
  json.recipes do
  json.array! @recipes.order('created_at DESC') do |recipe|
    json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
    json.user do
      json.extract! recipe.user, :id, :slug
    end
    if recipe.comments.any?
      json.comments recipe.comments do |comment|
        json.extract! comment, :id, :content
      end
    end
  end
  end
end
