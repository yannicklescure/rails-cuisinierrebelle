class BookmarkPolicy < ApplicationPolicy
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
    record.user == user || user.admin
    # true
  end

end
