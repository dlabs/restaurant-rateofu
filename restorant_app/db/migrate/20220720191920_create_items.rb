class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items, id: :uuid do |t|
      t.string :name, null: false
      t.integer :item_type, null: false
      t.string :description, null: false
      t.string :image_url
      t.float :price, null: false
      t.timestamps
    end
  end
end
