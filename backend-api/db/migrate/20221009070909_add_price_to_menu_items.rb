class AddPriceToMenuItems < ActiveRecord::Migration[7.0]
  def change
    add_monetize :menu_items, :price, currency: { present: false }
  end
end
