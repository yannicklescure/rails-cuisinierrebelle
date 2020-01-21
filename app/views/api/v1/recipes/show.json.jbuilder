json.extract! @recipe, :title, :subtitle, :video, :direction, :description, :photo
json.comments @recipe.comments do |comment|
  json.extract! comment, :id, :content
end
