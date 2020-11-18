class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :set_user, only: [ :followers, :following ]

  def index
    @users = policy_scope(User)
    @device = DeviceDetector.new(request.user_agent).device_type
  end

  def followers
    # binding.pry
    render @user.followers.map{ |f| {
        name: f.name,
        slug: f.slug,
        checked: f.checked,
        image: {
          thumb: {
            url: f.image.url(:thumb)
          }
        }
      }
    }
  end

  private

  def set_user
    # binding.pry
    @user = User.find_by(slug: params[:id])
    authorize @user  # For Pundit
  end

end
