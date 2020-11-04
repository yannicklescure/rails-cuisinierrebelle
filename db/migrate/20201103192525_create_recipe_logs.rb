class CreateRecipeLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :recipe_logs do |t|
      t.references :recipe, null: false, foreign_key: true

      t.integer  :user_id              # automatically logs @current_user.id
      t.string   :action_name          # logs the action_name
      t.string   :request_hash         # unique ID per request, in case you want to log multiple impressions and group them
      t.string   :session_hash         # logs the rails session
      t.string   :ip_address           # request.remote_ip
      t.text     :params               # request.params, except action name, controller name and resource id
      t.string   :referrer             # request.referer
      t.string   :message              # custom message you can add

      t.timestamps
    end
  end
end
