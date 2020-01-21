json.array! @recipes do |recipe|
  json.extract! recipe, :title, :subtitle, :video, :direction, :description, :photo
end
