class Airline < ApplicationRecord
  has_many :reviews
  has_many :bookings

  # Removed the before_create :slugify callback since we're not using slugs anymore

  # Safely calculate average score, even if there are no reviews or bad data
  def avg_score
    avg = reviews.average(:score)
    avg ? avg.to_f.round(2) : 0.0
  end

  # You might want to keep this method if you need to generate slugs for other purposes
  # (like generating URLs for emails or frontend), but it's not needed for routing
  def generate_slug
    name.parameterize
  end
end