class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :username
      t.string :role
      t.timestamps

      t.index [:username, :role], unique: true
    end
  end
end
