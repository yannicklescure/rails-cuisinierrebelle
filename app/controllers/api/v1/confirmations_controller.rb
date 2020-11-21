# frozen_string_literal: true

# class Devise::ConfirmationsController < DeviseController
class Api::V1::ConfirmationsController < Devise::ConfirmationsController

  layout false
  respond_to :json

  # GET /resource/confirmation/new
  def new
    self.resource = resource_class.new
  end

  # POST /resource/confirmation
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with({}, location: after_resending_confirmation_instructions_path_for(resource_name))
    else
      respond_with(resource)
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      # set_flash_message!(:notice, :confirmed)
      # respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
      json = MultiJson.dump({
        id: resource.id,
        email: resource.email,
        slug: resource.slug,
        first_name: resource.first_name,
        last_name: resource.last_name,
        name: resource.name,
        admin: resource.admin,
        authentication_token: resource.authentication_token,
        image: resource.image,
        checked: resource.checked,
        mailchimp: resource.mailchimp,
        notification: resource.notification,
        locale: resource.locale,
        moderator: resource.moderator,
        freemium: resource.freemium,
        likes: [],
        bookmarks: [],
        followers: {
          count: resource.followers.length,
          data: [],
        },
        following: {
          count: resource.following.length,
          data: [],
        },
      })
      render json: json
    else
      # respond_with_navigational(resource.errors, status: :unprocessable_entity){ render :new }
      render json: MultiJson.dump({ error: resource.errors, status: :unprocessable_entity })
    end
  end

  protected

    # The path used after resending confirmation instructions.
    def after_resending_confirmation_instructions_path_for(resource_name)
      is_navigational_format? ? new_session_path(resource_name) : '/'
    end

    # The path used after confirmation.
    def after_confirmation_path_for(resource_name, resource)
      if signed_in?(resource_name)
        signed_in_root_path(resource)
      else
        new_session_path(resource_name)
      end
    end

    def translation_scope
      'devise.confirmations'
    end
end
