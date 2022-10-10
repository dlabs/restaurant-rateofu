class AddTableIdToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :table_id, :integer
  end
end
