# app/helpers/application_helper.rb
module ApplicationHelper
  def javascript_entrypoint_pack_tag(*names, **options)
    javascript_include_tag(*sources_from_pack_manifest_entrypoints(names, type: :javascript), **options)
  end

private
  def sources_from_pack_manifest_entrypoints(names, type:)
    names.map do |name|
      Webpacker.manifest.lookup!('entrypoints')[name][manifest_type(type)]
    end.flatten
  end

  def manifest_type(type)
    case type
    when :javascript then 'js'
    when :stylesheet then 'css'
    else type.to_s
    end
  end

  def stylesheet_entrypoint_pack_tag(*names, **options)
    unless Webpacker.dev_server.running? && Webpacker.dev_server.hot_module_replacing?
      stylesheet_link_tag(*sources_from_pack_manifest_entrypoints(names, type: :stylesheet), **options)
    end
  end
end

# view file
# = javascript_entrypoint_pack_tag 'pack_name'
