class User < ApplicationRecord
  acts_as_token_authenticatable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :omniauthable, omniauth_providers: %i[facebook]

  # validates :first_name, presence: true
  # validates :last_name, presence: true
  validates :name, presence: true
  validates :email, presence: true

  has_many :recipes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_one :about, dependent: :destroy
  # has_many :socials, dependent: :destroy

  has_many :follower_relationships, foreign_key: :following_id, class_name: 'Follow'
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationships, foreign_key: :follower_id, class_name: 'Follow'
  has_many :following, through: :following_relationships, source: :following

  mount_uploader :image, ImageUploader

  def follow(user_id)
    following_relationships.create(following_id: user_id)
  end

  def unfollow(user_id)
    following_relationships.find_by(following_id: user_id).destroy
  end

  def is_following?(user_id)
    relationship = Follow.find_by(follower_id: id, following_id: user_id)
    return true if relationship
  end

  # Override Devise::Confirmable#after_confirmation
  def after_confirmation
    self.locale = I18n.locale
    self.save
    send_welcome_email
    async_update
  end

  # after_commit :create_default_image
  # after_commit :async_update # Run on create & update
  before_commit :sanitize_user_slug, :sanitize_user_image

  extend FriendlyId
  friendly_id :name, use: :slugged

  # include PgSearch::Model
  # # PgSearch.multisearch_options = {
  #   # using: [:tsearch, :trigram],
  #   # ignoring: :accents
  # # }
  # multisearchable against: [:name, :first_name, :last_name]
  searchkick
  private

  def sanitize_user_slug
    # binding.pry
    if slug.match?(/\W/)
      if User.find_by(slug: slug.gsub!(/\W/,'')).nil?
        slug.gsub!(/\W/,'')
      else
        slug = "#{first_name[0]}#{last_name}".downcase
        slug = "#{slug}#{DateTime.now.strftime('%Q')}"
      end
      # self.save
    end
  end

  def send_welcome_email
    UserMailer.with(user: self).welcome.deliver_now
  end

  def sanitize_user_image
    if image.url.nil?
      remote_image_url = 'https://media.cuisinierrebelle.com/profile/default.jpg'
      # self.save
    end
  end

  def async_update
    MailchimpSubscribeUser.perform_later(self)
    mailchimp = true
    # self.save
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name   # assuming the user model has a name
      name = Namae::Name.parse(user.name)
      user.first_name = name.given
      user.last_name = name.family
      # user.image = auth.info.image # assuming the user model has an image
      user.remote_image_url = "http://graph.facebook.com/#{user.uid}/picture?type=normal"
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      user.skip_confirmation!
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
