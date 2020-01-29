json.array! @recipes do |recipe|
  json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
  json.comments recipe.comments do |comment|
    json.extract! comment, :id, :content
  end
end
