class PagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def new?
    user.admin || user.moderator
  end

  def create?
    user.admin || user.moderator
  end

  def edit?
    user.admin || user.moderator
  end

  def update?
    user.admin || user.moderator
  end

  def destroy?
    user.admin
  end
end
