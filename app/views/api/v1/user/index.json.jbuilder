json.data do
  if user_signed_in?
    json.user do
      json.auth current_user, :email, :slug, :name, :checked, :locale
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
      #   json.likes current_user.likes do |like|
      #     json.extract! like, :recipe_id
      #   end
      # end
    end
  end
end
