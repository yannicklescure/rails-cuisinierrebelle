class NullObjectPolicy < ApplicationPolicy

  def index?
    true
  end

  def show?
    true
  end

  def process_token?
    true
  end

  def is_authenticated?
    # false # or true if you want to authorize and handle response later
    true
  end
end
