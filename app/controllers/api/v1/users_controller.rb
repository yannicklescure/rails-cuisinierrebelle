class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_and_set_user, only: [ :follow, :unfollow ]
  # before_action :authenticate_user!, except: [ :index, :show, :followers, :following ]
  before_action :set_user, only: [ :follow, :unfollow, :followers, :following ]

  def index
    @users = policy_scope(User).includes([:followers, :following])
    # @device = DeviceDetector.new(request.user_agent).device_type
    json = Rails.cache.fetch(User.cache_key(@users)) do
      MultiJson.dump({
        data: {
          users: @users.map { |user| {
              id: user.id,
              slug: user.slug,
              name: user.name,
              checked: user.checked,
              followers: {
                count: user.followers.length,
                data: user.followers.map { |f| {
                    name: f.name,
                    slug: f.slug,
                    checked: f.checked,
                    image: {
                      thumb: {
                        url: f.image.url(:thumb)
                      }
                    }
                  }
                },
              },
              following: {
                count: user.following.length,
                data: user.following.map { |f| {
                    name: f.name,
                    slug: f.slug,
                    checked: f.checked,
                    image: {
                      thumb: {
                        url: f.image.url(:thumb)
                      }
                    }
                  }
                },
              },
              image: {
                full: {
                  url: user.image.url(:full)
                },
                preview: {
                  url: user.image.url(:preview)
                },
                thumb: {
                  url: user.image.url(:thumb)
                }
              },
            }
          }
        }
      })
    end
    render json: json
  end

  def show
    # binding.pry
    @user = User.find_by(slug: params['id'])
    authorize @user
    json = MultiJson.dump({
        data: {
          user: {
            id: @user.id,
            slug: @user.slug,
            name: @user.name,
            checked: @user.checked,
            followers: {
              count: @user.followers.length,
              data: @user.followers.map { |f| {
                  name: f.name,
                  slug: f.slug,
                  checked: f.checked,
                  image: {
                    thumb: {
                      url: f.image.url(:thumb)
                    }
                  }
                }
              },
            },
            following: {
              count: @user.following.length,
              data: @user.following.map { |f| {
                  name: f.name,
                  slug: f.slug,
                  checked: f.checked,
                  image: {
                    thumb: {
                      url: f.image.url(:thumb)
                    }
                  }
                }
              },
            },
            image: {
              full: {
                url: @user.image.url(:full)
              },
              preview: {
                url: @user.image.url(:preview)
              },
              thumb: {
                url: @user.image.url(:thumb)
              }
            },
          }
        }
      })
    render json: json
  end

  def follow
    # binding.pry
    if current_user.follow(@user.id)
      render json: MultiJson.dump({
        user: {
          name: @user.name,
          slug: @user.slug,
          checked: @user.checked,
          image: {
            thumb: {
              url: @user.image.url(:thumb)
            }
          }
        }
      })
    end
  end

  def unfollow
    # binding.pry
    if current_user.unfollow(@user.id)
      render json: {}
    end
  end

  def followers
    # binding.pry
    json = MultiJson.dump({
      data: {
        users: @user.followers.map { |f| {
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
      }
    })
    render json: json
  end

  def following
    # binding.pry
    json = MultiJson.dump({
      data: {
        users: @user.following.map { |f| {
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
      }
    })
    render json: json
  end

  def is_authenticated
    process_token
    # binding.pry
    render json: {
      isAuthenticated: user_signed_in?
    }
  end

  private

  def set_user
    # binding.pry
    @user = User.find_by(slug: params[:user_slug])
    authorize @user  # For Pundit
    # binding.pry
  end

end
