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
    # binding.pry
    # record.user == user || user.admin
    true
  end

  def destroy?
    # record.user == user || user.admin
    true
  end
end
