require "base64"

class Api::V1::RecipeLogsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :create ]

  def create
    @recipe = Recipe.find(params[:recipe_id])
    # binding.pry
    @recipe_log = RecipeLog.find_by(user_id: params[:user_id], recipe: @recipe, session_hash: request.env["HTTP_X_CSRF_TOKEN"])
    if @recipe_log.nil?
      @recipe_log = RecipeLog.new(recipe_log_params)
      @recipe_log.recipe = @recipe
      # automatically logs @current_user.id
      @recipe_log.user_id = params[:user_id]
      # logs the action_name
      @recipe_log.action_name = nil
      # unique ID per request, in case you want to log multiple impressions and group them
      @recipe_log.request_hash = request.request_id
      # logs the rails session
      @recipe_log.session_hash = request.env["HTTP_X_CSRF_TOKEN"]
      # request.remote_ip
      @recipe_log.ip_address = request.remote_ip
      # request.params, except action name, controller name and resource id
      @recipe_log.params = request.params
      # request.referer
      @recipe_log.referrer = request.referer
      # custom message you can add
      @recipe_log.message = nil

      if @recipe_log.save
        # @recipe.views += 1
        @recipe.views = RecipeLog.where(recipe: @recipe).count
        @recipe.save
      end
    end
    authorize @recipe_log
    render json: { views: @recipe.views }
  end

  private

  def recipe_log_params
    params.require(:recipe_log).permit(:recipe_id, :user_id)
  end

  def session_hash

      # # careful: request.session_options[:id] encoding in rspec test was ASCII-8BIT
      # # that broke the database query for uniqueness. not sure if this is a testing only issue.
      # str = request.session_options[:id]
      # logger.debug "Encoding: #{str.encoding.inspect}"
      # # request.session_options[:id].encode("ISO-8859-1")
      if Rails::VERSION::MAJOR >= 4
        session["init"] = true
        id = session.id.to_s
      else
        id = request.session_options[:id]
      end

      unless id.is_a? String
        id = id.cookie_value if Rack::Session::SessionId.const_defined?(:ID_VERSION) && Rack::Session::SessionId::ID_VERSION == 2
      end

      # id = cookies.session.id
      # rack 2.0.8 releases new version of session id, id.to_s will raise error!
      id
    end
end
