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

ActiveRecord::Schema[7.1].define(version: 2025_08_11_125715) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airlines", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "country"
    t.string "headquarters"
    t.integer "established_year"
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "airline_id", null: false
    t.date "departure_date"
    t.date "return_date"
    t.time "departure_time"
    t.integer "passengers"
    t.string "cabin_class"
    t.string "origin"
    t.string "destination"
    t.text "special_requests"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.decimal "amount"
    t.index ["airline_id"], name: "index_bookings_on_airline_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.decimal "score", precision: 5, scale: 2
    t.bigint "airline_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["airline_id"], name: "index_reviews_on_airline_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
  end

  add_foreign_key "bookings", "airlines"
  add_foreign_key "bookings", "users"
  add_foreign_key "reviews", "airlines"
  add_foreign_key "reviews", "users"
end
