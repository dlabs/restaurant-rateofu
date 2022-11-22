# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_22_105144) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "employees", force: :cascade do |t|
    t.string "username"
    t.string "role"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username", "role"], name: "index_employees_on_username_and_role", unique: true
  end

  create_table "items", id: false, force: :cascade do |t|
    t.uuid "id", null: false
    t.string "title"
    t.string "description"
    t.string "image_url"
    t.string "item_type"
    t.integer "price_cents"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_items_on_id", unique: true
  end

  create_table "order_items", id: false, force: :cascade do |t|
    t.uuid "id", null: false
    t.string "order_id"
    t.string "item_id"
    t.integer "quantity"
    t.string "status"
    t.string "staff_history", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_order_items_on_id", unique: true
    t.index ["order_id", "item_id"], name: "index_order_items_on_order_id_and_item_id", unique: true
  end

  create_table "orders", id: false, force: :cascade do |t|
    t.uuid "id", null: false
    t.string "table_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
