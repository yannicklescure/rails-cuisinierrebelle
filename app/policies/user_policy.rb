class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    true
  end

  def followers?
    true
  end

  def following?
    true
  end

  def follow?
    true
  end

  def unfollow?
    true
  end

  def destroy?
    user.admin
  end

  def reset_user_password?
    true
  end

  def reset_user_password_verification?
    true
  end

  def request_user_password_reset?
    true
  end

  def process_token?
    true
  end

  def is_authenticated?
    true
  end
end
