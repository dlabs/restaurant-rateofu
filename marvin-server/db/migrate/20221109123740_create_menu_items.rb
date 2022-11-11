class CreateMenuItems < ActiveRecord::Migration[7.0]
  def change
    create_table :menu_items, id: false do |t|
      t.uuid :item_id, primary_key: true, null: false, default: 'gen_random_uuid()'
      t.string :item_title
      t.float :item_price
      t.string :item_image
      t.string :item_type
      t.text :item_description

      t.timestamps
    end
  end
end
