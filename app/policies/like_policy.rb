class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def update?
    true
  end

  def create?
    true
  end

  def destroy?
    # binding.pry
    record.user.id == user.id || user.admin
    # true
  end

end
