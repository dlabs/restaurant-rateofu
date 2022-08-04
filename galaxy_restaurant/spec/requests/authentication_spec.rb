require "rails_helper"

RSpec.describe "Login management" do
  context "token generation" do
    it "returns a json response that includes a bearer token" do
      allow(StaffMember).to receive(:find_by).and_return(build_stubbed(:staff_member))
      allow_any_instance_of(ApplicationController).to receive(:encode_token).and_return("secret")

      headers = { "ACCEPT" => "application/json" }

      post "/api/login", params: {
        username: "John Chef"
      },
      headers: headers

      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to eq(
        {
          bearer_token: "secret" 
        }.to_json
      )
    end
  end
end
