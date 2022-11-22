class Item < ApplicationRecord
  before_create :generate_uuid
end
