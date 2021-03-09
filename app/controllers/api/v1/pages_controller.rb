class Api::V1::PagesController < Api::V1::BaseController
  before_action :authenticate_and_set_user

  def index
    @pages = policy_scope(Page)

    json = Rails.cache.fetch(Page.cache_key(@pages)) do
      # recipes.to_json(include: :user, :comments)
      MultiJson.dump({
        data: {
          pages: @pages.map { |page| {
              id: page.id,
              title: page.title,
              slug: page.slug,
              locale: page.locale,
              content: page.content,
            }
          },
        }
      })
    end
    render json: json
  end

  def create
    # binding.pry
    params[:page] = {
      title: clean_params(params[:title]),
      content: clean_params(params[:content]),
      locale: clean_params(params[:locale]),
    }

    @page = Page.new(page_params)
    authorize @page  # For Pundit
    # binding.pry
    if @page.save
      render json:  MultiJson.dump({
        id: @page.id,
        slug: @page.slug,
        title: @page.title,
        content: @page.content,
        locale: @page.locale,
      })
    end
  end

  def update
    # binding.pry
    @page = Page.find_by(id: params[:id])
    authorize @page  # For Pundit
    params[:page] = {
      title: clean_params(params[:title]),
      content: clean_params(params[:content]),
      locale: clean_params(params[:locale]),
    }

    if @page.update(page_params)
      # binding.pry
      render json:  MultiJson.dump({
        id: @page.id,
        slug: @page.slug,
        title: @page.title,
        content: @page.content,
        locale: @page.locale,
      })
    end
  end

  private

  def clean_params(param)
    param === "null" ? nil : param
  end

  def page_params
    # binding.pry
    params.require(:page).permit(:title, :content, :locale)
  end

end
