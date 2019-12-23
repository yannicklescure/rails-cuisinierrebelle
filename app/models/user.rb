class User < ApplicationRecord
  has_many :bookmarks

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  # after_create :send_welcome_email
  # Override Devise::Confirmable#after_confirmation
  def after_confirmation
    send_welcome_email
  end

  extend FriendlyId
  friendly_id :name, use: :slugged

  private

  def send_welcome_email
    UserMailer.with(user: self).welcome.deliver_now
  end
end
