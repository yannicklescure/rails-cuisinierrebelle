class CreatePagesJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    @pages = Page.all
    timestamp = (Page.last.created_at.to_f * 1000).to_i
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
