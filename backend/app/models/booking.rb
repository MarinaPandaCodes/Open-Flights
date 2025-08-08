class Booking < ApplicationRecord
   belongs_to :user
  belongs_to :airline

  validates :departure_date, :departure_time, :passengers, 
            :cabin_class, :origin, :destination, presence: true
  validates :passengers, numericality: { greater_than: 0 }
end
