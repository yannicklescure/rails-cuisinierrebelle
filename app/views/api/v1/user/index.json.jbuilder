json.data do
  if user_signed_in?
    json.user do
      json.auth current_user, :email, :slug, :name, :image, :checked
      # if current_user.likes.any?
      #   json.likes current_user.likes do |like|
      #     json.extract! like, :recipe_id
      #   end
      # end
    end
  end
end
