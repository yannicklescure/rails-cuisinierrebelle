class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    return true
  end

  def follow?
    return true
  end

  def unfollow?
    return true
  end
end
