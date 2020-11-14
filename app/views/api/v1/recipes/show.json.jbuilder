json.extract! @recipe, :id, :title, :subtitle, :video, :direction, :description, :photo
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
