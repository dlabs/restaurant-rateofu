class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders, id: false do |t|
      t.column :id, :uuid, null: false
      t.string :table_id
      t.timestamps
    end
  end
end
