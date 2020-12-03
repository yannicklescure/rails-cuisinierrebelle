class ReplyLikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    true
  end

  def destroy?
    record.user.id == user.id || user.admin
  end

  def update?
    true
  end
end
