class AddDetailsToAirlines < ActiveRecord::Migration[7.1]
  def change
    add_column :airlines, :country, :string
    add_column :airlines, :headquarters, :string
    add_column :airlines, :established_year, :integer
  end
end
