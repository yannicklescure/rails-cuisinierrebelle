module DeviceHelper
  def client
    DeviceDetector.new(request.user_agent)
  end
end
