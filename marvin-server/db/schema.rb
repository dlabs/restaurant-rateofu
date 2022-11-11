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

ActiveRecord::Schema[7.0].define(version: 2022_11_09_145132) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "menu_items", primary_key: "item_id", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "item_title"
    t.float "item_price"
    t.string "item_image"
    t.string "item_type"
    t.text "item_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "order_items", primary_key: "order_item_id", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "status", default: "ordered"
    t.uuid "order_id"
    t.uuid "item_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", primary_key: "order_id", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "table_id"
    t.float "order_total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
