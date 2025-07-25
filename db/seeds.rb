# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
Airline.create([
  { 
    name: "United Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/United-Airlines.png"
  }, 
  { 
    name: "Southwest",
    image_url: "https://open-flights.s3.amazonaws.com/Southwest-Airlines.png"
  },
  { 
    name: "Delta",
    image_url: "https://open-flights.s3.amazonaws.com/Delta.png" 
  }, 
  { 
    name: "Alaska Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/Alaska-Airlines.png" 
  }, 
  { 
    name: "JetBlue",
    image_url: "https://open-flights.s3.amazonaws.com/JetBlue.png" 
  }, 
  { 
    name: "American Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/American-Airlines.png" 
  }
])

airlines = Airline.all


reviews = Review.create([
  {
    title: "Great Experience",
    description: "I had a wonderful flight with United Airlines. The staff was friendly and the service was excellent.",
    score: 5,
    airline: airlines.first
  },
  {
    title: "Average Service",
    description: "The flight was okay, but the food could have been better. Overall, it was a decent experience.",
    score: 3,
    airline: airlines.second
  },
  {
    title: "Not Impressed",
    description: "I expected more from Delta. The flight was delayed and the staff seemed overwhelmed.",
    score: 2,
    airline: airlines.third
  },
  {
    title: "Fantastic Flight",
    description: "Alaska Airlines exceeded my expectations. The flight was smooth and the crew was attentive.",
    score: 5, 
    airline: airlines.fourth
  },
  {
    title: "Loved JetBlue",
    description: "JetBlue always provides a great experience. Comfortable seats and great in-flight entertainment.",
    score: 4,
    airline: airlines.fifth
  },
  {
    title: "American Airlines Needs Improvement",
    description: "The flight was delayed and the customer service was lacking. I hope they can
do better in the future.",
    score: 2,
    airline: airlines.last
  }
])

