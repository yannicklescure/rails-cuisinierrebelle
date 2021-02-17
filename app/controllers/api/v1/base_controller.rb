class Api::V1::BaseController < ActionController::API
  # protect_from_forgery with: :null_session

  include ActionController::MimeResponds

  include Pundit

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  rescue_from StandardError,                with: :internal_server_error
  rescue_from Pundit::NotAuthorizedError,   with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  respond_to :json

  def jwt_with_jti_matcher_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_jti_matcher_user!,
                only: :jwt_with_jti_matcher_user_auth_action

  def jwt_with_denylist_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_denylist_user!,
                only: :jwt_with_denylist_user_auth_action

  def jwt_with_allowlist_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_allowlist_user!,
                only: :jwt_with_allowlist_user_auth_action

  def jwt_with_null_user_auth_action
    head :ok
  end
  before_action :authenticate_jwt_with_null_user!,
                only: :jwt_with_null_user_auth_action

  def render_resource(resource)
    # binding.pry
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end

  private

  def process_token
    # binding.pry
    @token = request.headers['Authorization']&.split('Bearer ')&.last
    @token = nil if @token == "null"
    # binding.pry
    # if request.headers['Authorization'].present?
    if @token.nil?
      @user = NullObject.new
      authorize @user
    else
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1].remove('"'), ENV['DEVISE_JWT_SECRET_KEY']).first
      @user = User.find(jwt_payload['user_id'])
      authorize @user
      authenticate_and_set_user if @user.present?
    end
  end

  def user_not_authorized(exception)
    render json: {
      error: "Unauthorized #{exception.policy.class.to_s.underscore.camelize}.#{exception.query}"
    }, status: :unauthorized
  end

  def not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def internal_server_error(exception)
    if Rails.env.development?
      response = { type: exception.class.to_s, message: exception.message, backtrace: exception.backtrace }
    else
      response = { error: "Internal Server Error" }
    end
    render json: response, status: :internal_server_error
  end
end
