class AirlineSerializer 
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :slug, :avg_score, :description, :country, :headquarters, :established_year
  has_many :reviews
end
