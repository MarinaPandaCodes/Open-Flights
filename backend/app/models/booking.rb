class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :airline

  # Presence validations
  validates :airline_id, :departure_date, :departure_time,
            :origin, :destination, :passengers, :cabin_class, presence: true

  # String length validation
  validates :origin, :destination, length: { minimum: 2 }

  # Numericality validations
  validates :passengers, numericality: { only_integer: true, greater_than: 0 }
  validates :amount, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # Inclusion validations
  validates :cabin_class, inclusion: { in: %w[economy premium_economy business first] }
  validates :status, inclusion: { in: %w[PENDING CONFIRMED CANCELED] }

    validates :departure_date, :return_date, :passengers, :cabin_class, 
            :origin, :destination, presence: true
end
