# frozen_string_literal: true

class MenuItem < ApplicationRecord
  monetize :price_cents

  self.inheritance_column = :_type_disabled
  enumerate :type, with: MenuItemFoodTypes

  has_one_attached :image
end
