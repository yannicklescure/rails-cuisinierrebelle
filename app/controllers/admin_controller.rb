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
    @users = User.all.map{ |user| user if user.confirmed? }.compact
  end

  def recipes
    @recipes = Recipe.all
  end

  def comments
    @messages = []
    comments = Comment.where(spam: false)
    @messages += comments.map { |message| message }
    replies = Reply.where(spam: false)
    @messages += replies.map { |message| message }
  end

  def replies
    @replies = Reply.all
  end

  def spam
  end

  private

  def set_spam
    @spams = []
    comments = Comment.where(spam: true)
    @spams += comments.map { |message| message }
    replies = Reply.where(spam: true)
    @spams += replies.map { |message| message }
  end

  def set_menu
    @menu = params[:menu] == 'true' || params[:menu].nil?
  end
end
