class CreatePagesJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    @pages = Page.all

    Rails.cache.fetch(Page.cache_key(@pages)) do
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
  end
end
