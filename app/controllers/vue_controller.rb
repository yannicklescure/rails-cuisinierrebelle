class VueController < AppController
  skip_before_action :authenticate_user!, only: [:index]

  layout 'vue'

  def index
    @recipes = policy_scope(Recipe)
  end

end
