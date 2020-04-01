class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
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
end
