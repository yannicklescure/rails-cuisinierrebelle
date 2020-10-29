class Api::V1::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  # protect_from_forgery prepend: true
  # protect_from_forgery with: :null_session, prepend: true

  # protect_from_forgery :except => [:create]
  # before_action :verify_jwt_token

  respond_to :json

  # def create
  #   super
  #   # binding.pry
  # end

  # def destroy
  #   # binding.pry
  #   puts resource
  #   super
  # end

  private

  # def verify_jwt_token
  #   head :unauthorized if request.headers['Authorization'].nil? ||
  #     !AuthToken.valid?(request.headers['Authorization'].split(' ').last)
  # end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
