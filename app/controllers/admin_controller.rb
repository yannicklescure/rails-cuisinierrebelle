class AdminController < ApplicationController
  before_action :set_spam, :set_menu

  def index
    # @users = policy_scope(User).where.not(id: current_user.id)
    @users = policy_scope(User).map{ |user| user if user.confirmed? }.compact
    @recipes = Recipe.all
    @comments = Comment.all
    @replies = Reply.all
  end

  def users
    @users = User.all.map{ |user| user if user.confirmed? }.compact.sort_by {|u| u.id}.reverse
    # @users = User.all.page params[:page]
    @users = Kaminari.paginate_array(@users).page(params[:page])
  end

  def recipes
    # @recipes = Recipe.all
    @recipes = Recipe.all.map{ |r| r }.compact.sort_by {|r| r.id}.reverse
    @recipes = Kaminari.paginate_array(@recipes).page(params[:page])
  end

  def comments
    @messages = []
    comments = Comment.where(spam: false)
    @messages += comments.map { |message| message }.sort_by {|u| u.id}.reverse
    replies = Reply.where(spam: false)
    @messages += replies.map { |message| message }.sort_by {|u| u.id}.reverse
    @messages = Kaminari.paginate_array(@messages).page(params[:page])
  end

  def replies
    @replies = Reply.all.page params[:page]
  end

  def spam
    @spams = Kaminari.paginate_array(@spams).page(params[:page])
  end

  def analytics
    @search_words = []
    @searches = Search.all
    @searches.map do |search|
      # @searches.select { |s| s.query == search.query }
      unless @search_words.include? search.query.downcase
        @search_words << search.query.downcase
      end
    end

    arr= []
    @search_words.each do |search_word|
      search_word_count = @searches.select { |s| s.query == search_word && s.user != ('1' || '2') }.count
      arr << {
        query: search_word,
        count: search_word_count,
        percent: ((search_word_count.to_f / @search_words.count) * 100).round(2)
      }
    end
    @search_words = arr.sort_by {|obj| obj[:count] }.reverse.take(10)
    # binding.pry
  end

  private

  def set_spam
    @spams = []
    comments = Comment.where(spam: true)
    @spams += comments.map { |message| message }.sort_by {|u| u.id}.reverse
    replies = Reply.where(spam: true)
    @spams += replies.map { |message| message }.sort_by {|u| u.id}.reverse
  end

  def set_menu
    @menu = params[:menu] == 'true' || params[:menu].nil?
  end
end
