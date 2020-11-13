class ReplyPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def new?
    true
  end

  def create?
    true
  end

  def edit?
    true
  end

  def update?
    true
  end

  def destroy?
    record.user == user || user.admin
    # - record: the restaurant passed to the `authorize` method in controller
    # - user:   the `current_user` signed in with Devise.
  end

  def spam?
    user.admin
  end
end
