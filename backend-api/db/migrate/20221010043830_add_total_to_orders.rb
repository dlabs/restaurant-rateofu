class AddTotalToOrders < ActiveRecord::Migration[7.0]
  def change
    add_monetize :orders, :total, currency: { present: false }
  end
end