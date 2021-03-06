class RecipePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def new?
    true
  end

  def create?
    true
  end

  def update?
    record.user.id == user.id
    # - record: the restaurant passed to the `authorize` method in controller
    # - user:   the `current_user` signed in with Devise.
  end

  def destroy?
    record.user.id == user.id || user.admin
  end

  def tagged?
    true
  end
end
