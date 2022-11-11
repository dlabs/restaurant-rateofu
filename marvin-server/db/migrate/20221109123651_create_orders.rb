class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :orders, id: false do |t|
      t.uuid :order_id, primary_key: true, null: false, default: 'gen_random_uuid()'
      t.string :table_id
      t.float :order_total

      t.timestamps
    end
  end
end
