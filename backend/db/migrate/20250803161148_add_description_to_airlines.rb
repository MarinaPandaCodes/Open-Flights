class AddDescriptionToAirlines < ActiveRecord::Migration[7.1]
  def change
    add_column :airlines, :description, :text
  end
end
