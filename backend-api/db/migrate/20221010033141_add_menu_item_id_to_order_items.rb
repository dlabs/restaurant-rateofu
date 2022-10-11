class AddMenuItemIdToOrderItems < ActiveRecord::Migration[7.0]
  def change
    add_column :order_items, :menu_item_id, :integer
  end
end
