# Migration for creating MenuItems -> Orders relation
class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items, id: false do |t|
      t.uuid :order_item_id, primary_key: true, null: false, default: 'gen_random_uuid()'
      t.string :status, default: 'ordered'
      t.uuid :order_id
      t.uuid :item_id
      t.integer :quantity
      t.timestamps
    end
  end
end
