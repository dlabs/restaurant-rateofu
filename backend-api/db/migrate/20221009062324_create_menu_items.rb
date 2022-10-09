class CreateMenuItems < ActiveRecord::Migration[7.0]
  def change
    create_table :menu_items do |t|
      t.string :title
      t.text :description
      t.integer :type

      t.timestamps
    end
  end
end
