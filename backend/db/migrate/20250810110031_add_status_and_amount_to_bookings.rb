class AddStatusAndAmountToBookings < ActiveRecord::Migration[7.1]
  def change
    add_column :bookings, :status, :string
    add_column :bookings, :amount, :decimal
  end
end
