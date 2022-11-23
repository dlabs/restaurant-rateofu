class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items, id: false do |t|
      t.column :id, :uuid, null: false, primary: true
      t.string :order_id
      t.string :item_id
      t.integer :quantity
      t.string :status
      t.string :staff_history, array: true, default: []
      t.timestamps

      t.index :id, unique: true
      t.index [:order_id, :item_id], unique: true
    end
  end
end
