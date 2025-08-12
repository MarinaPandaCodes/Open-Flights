class AirlineSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :image_url, :country,
             :description, :headquarters, :established_year
             # Removed :slug unless needed for display purposes

  attribute :bookings_count do |object|
    object.respond_to?(:bookings_count) ? object.bookings_count : object.bookings.size
  end

  attribute :reviews_count do |object|
    object.reviews.size
  end

  attribute :avg_score do |object|
    # Defensive: avg_score might be nil or float
    score = object.avg_score
    score.is_a?(Numeric) ? score.round(2) : 0.0
  end

  has_many :reviews

  # Optional: Only include if you still need slug for display purposes
  attribute :slug do |object|
    object.name.parameterize if object.name.present?
  end
end