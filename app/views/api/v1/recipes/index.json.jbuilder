json.data do
  if user_signed_in?
    json.user current_user, :email
  end
  json.recipes do
  json.array! @recipes do |recipe|
    json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
    json.comments recipe.comments do |comment|
      json.extract! comment, :id, :content
    end
  end
  end
end
