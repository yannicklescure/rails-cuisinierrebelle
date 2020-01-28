json.array! @recipes do |recipe|
  json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count, :bookmarks_count
  # json.likes_count recipe.likes.count
  # json.bookmarks_count recipe.bookmarks.count
  if recipe.comments.any?
    json.comments recipe.comments do |comment|
      json.extract! comment, :id, :content
    end
  end
end

