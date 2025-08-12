class Review < ApplicationRecord
  belongs_to :airline
   belongs_to :user
  
  # Change any 'name' validations to 'title'
  validates :title, presence: true
  validates :description, presence: true
  validates :score, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
end