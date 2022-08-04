require "rails_helper"

RSpec.describe Item do
  let!(:item) { build(:item, title: "Whale Steak") }

  context "#title" do
    it "must be present" do
      item.title = ""
      expect(item).to_not be_valid
    end

    it "must be unique" do
      create(:item, title: "Whale Steak")
      expect(item).to_not be_valid
    end
  end

  context "#price" do
    it "must be present" do
      item.price = ""
      expect(item).to_not be_valid
    end
  end

  context "#description" do
    it "must be present" do
      item.description = ""
      expect(item).to_not be_valid
    end
  end

  context "#kind" do
    it "must be present" do
      item.kind = ""
      expect(item).to_not be_valid
    end
  end
end
