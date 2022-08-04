class CreateStaffMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :staff_members, id: :uuid do |t|
      t.string :username, null: false, index: true, unique: true
      t.integer :role, null: false, default: 0, index: true

      t.timestamps
    end
  end
end
