# json.users @users do |user|
#   json.extract! user, :id, :name
# end
json.data do
  if user_signed_in?
    json.user do
      json.extract! current_user, :id, :email
    end
  end
end
