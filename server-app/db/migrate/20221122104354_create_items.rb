class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items, id: false do |t|
      t.column :id, :uuid, null: false
      t.string :title
      t.string :description
      t.string :image_url
      t.string :item_type
      t.integer :price_cents
      t.timestamps

      t.index :id, unique: true
    end
  end
end
