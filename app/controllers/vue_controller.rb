class VueController < AppController
  skip_before_action :authenticate_user!, only: [:index]

  layout 'vue'

  def index
    @recipes = policy_scope(Recipe)
    if !params[:path].nil? && params[:path].match?(/^(?:r\/)(.+)/)
      # binding.pry
      @recipe = Recipe.find_by(slug: params[:path].match(/^(?:r\/)(.+)/)[1])
    end
  end

end
