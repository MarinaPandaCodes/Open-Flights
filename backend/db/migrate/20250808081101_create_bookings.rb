# db/migrate/20250808081101_create_bookings.rb
class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :airline, null: false, foreign_key: true
      t.date :departure_date
      t.date :return_date
      t.time :departure_time
      t.integer :passengers
      t.string :cabin_class
      t.string :origin
      t.string :destination
      t.text :special_requests

      t.timestamps
    end
  end
end