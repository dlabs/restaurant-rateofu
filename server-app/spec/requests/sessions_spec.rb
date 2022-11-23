require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe "POST /login" do
    it "creates new employee" do
      hsh = { session: { username: "Toni", role: Employee::Kind::Chef }}
      post "/api/login", params: hsh
      expect(response).to have_http_status(:success)
      expect(Employee.count).to eq(1)
    end

    it "doesn't create use after Employee logs in sereral times" do
      hsh = { session: { username: "Toni", role: Employee::Kind::Chef }}
      expect(Employee.count).to eq(0)
      post "/api/login", params: hsh
      post "/api/login", params: hsh
      post "/api/login", params: hsh
      expect(Employee.count).to eq(1)
    end
  end

end
