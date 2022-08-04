require "rails_helper"

RSpec.describe StaffMember do
  let(:member) { build(:staff_member) }

  context "#username" do
    it "must be present" do
      member.username = nil
      expect(member).not_to be_valid
    end
  end

  context "#role" do
    it "must be present" do
      member.role = nil
      expect(member).not_to be_valid
    end
  end
end
