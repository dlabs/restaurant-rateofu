class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items, id: :uuid do |t|
      t.string :title, null: false, index: { unique: true }
      t.decimal :price, null: false, index: true
      t.text :description, null: false
      t.integer :kind, null: false, default: 0
      t.string :image

      t.timestamps
    end
  end
end
