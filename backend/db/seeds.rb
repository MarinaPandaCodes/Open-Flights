airlines = Airline.create([
   {
    name: "Air India",
    image_url: "https://open-flights.s3.amazonaws.com/Air-India.png",
    description: "Air India is the flag carrier airline of India, owned by Tata Group. It operates domestic and international flights across Asia, Europe, North America, and beyond.",
    country: "India",
    headquarters: "New Delhi, India",
    established_year: 1932
  },
  {
    name: "IndiGo",
    image_url: "https://open-flights.s3.amazonaws.com/IndiGo.png",
    description: "IndiGo is India's largest airline by passengers carried and fleet size, known for its low-cost model and punctual service.",
    country: "India",
    headquarters: "Gurugram, Haryana, India",
    established_year: 2006
  },
  {
    name: "SpiceJet",
    image_url: "https://open-flights.s3.amazonaws.com/SpiceJet.png",
    description: "SpiceJet is a low-cost airline based in India, offering affordable domestic and international flights.",
    country: "India",
    headquarters: "Gurugram, Haryana, India",
    established_year: 2005
  },
  {
    name: "Vistara",
    image_url: "https://open-flights.s3.amazonaws.com/Vistara.png",
    description: "Vistara is a full-service Indian airline, a joint venture between Tata Sons and Singapore Airlines, known for premium service.",
    country: "India",
    headquarters: "Gurugram, Haryana, India",
    established_year: 2013
  },
  {
    name: "Go First",
    image_url: "https://open-flights.s3.amazonaws.com/GoFirst.png",
    description: "Go First is an Indian ultra-low-cost airline known for budget-friendly domestic travel options.",
    country: "India",
    headquarters: "Mumbai, Maharashtra, India",
    established_year: 2005
  },
  {
    name: "AirAsia India",
    image_url: "https://open-flights.s3.amazonaws.com/AirAsia-India.png",
    description: "AirAsia India is a low-cost carrier operating in India, a joint venture between Tata Sons and AirAsia Berhad.",
    country: "India",
    headquarters: "Bengaluru, Karnataka, India",
    established_year: 2013
  },
  {
    name: "Alliance Air",
    image_url: "https://open-flights.s3.amazonaws.com/Alliance-Air.png",
    description: "Alliance Air is a regional airline in India and a subsidiary of Air India, operating domestic routes to smaller cities.",
    country: "India",
    headquarters: "New Delhi, India",
    established_year: 1996
  },
  {
    name: "Air India Express",
    image_url: "https://open-flights.s3.amazonaws.com/Air-India-Express.png",
    description: "Air India Express is a low-cost subsidiary of Air India, focusing on short-haul international routes.",
    country: "India",
    headquarters: "Kochi, Kerala, India",
    established_year: 2005
  },
  {
    name: "Akasa Air",
    image_url: "https://open-flights.s3.amazonaws.com/Akasa-Air.png",
    description: "Akasa Air is a new Indian low-cost airline committed to reliable and affordable travel.",
    country: "India",
    headquarters: "Mumbai, Maharashtra, India",
    established_year: 2021
  },
  {
    name: "Star Air",
    image_url: "https://open-flights.s3.amazonaws.com/Star-Air.png",
    description: "Star Air is a regional airline in India, operating under the UDAN scheme to connect underserved cities.",
    country: "India",
    headquarters: "Bengaluru, Karnataka, India",
    established_year: 2019
  },
  {
    name: "TruJet",
    image_url: "https://open-flights.s3.amazonaws.com/TruJet.png",
    description: "TruJet is a regional airline in India offering budget flights to smaller towns and cities.",
    country: "India",
    headquarters: "Hyderabad, Telangana, India",
    established_year: 2013
  },
  {
    name: "Zoom Air",
    image_url: "https://open-flights.s3.amazonaws.com/Zoom-Air.png",
    description: "Zoom Air is a regional Indian airline operating short-haul flights to tier-2 and tier-3 cities.",
    country: "India",
    headquarters: "New Delhi, India",
    established_year: 2017
  },
  { 
    name: "United Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/United-Airlines.png",
    description: "United Airlines is a major American airline headquartered in Chicago, Illinois. It operates a large domestic and international route network.",
    country: "United States",
    headquarters: "Chicago, Illinois",
    established_year: 1926
  }, 
  { 
    name: "Southwest Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/Southwest-Airlines.png",
    description: "Southwest Airlines is a major American airline known for its low-cost fares and no-frills service. It operates more than 4,000 flights daily.",
    country: "United States",
    headquarters: "Dallas, Texas",
    established_year: 1967
  },
  { 
    name: "Delta Air Lines",
    image_url: "https://open-flights.s3.amazonaws.com/Delta.png",
    description: "Delta Air Lines is a major American airline, with its headquarters in Atlanta, Georgia. It is one of the oldest airlines in the United States.",
    country: "United States",
    headquarters: "Atlanta, Georgia",
    established_year: 1924
  }, 
  { 
    name: "Alaska Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/Alaska-Airlines.png",
    description: "Alaska Airlines is a major American airline headquartered in Seattle, Washington. It is known for its strong presence on the West Coast.",
    country: "United States",
    headquarters: "Seattle, Washington",
    established_year: 1932
  }, 
  { 
    name: "JetBlue Airways",
    image_url: "https://open-flights.s3.amazonaws.com/JetBlue.png",
    description: "JetBlue Airways is a major American low-cost airline, and the 7th largest airline in North America.",
    country: "United States",
    headquarters: "Long Island City, New York",
    established_year: 1998
  }, 
  { 
    name: "American Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/American-Airlines.png",
    description: "American Airlines is a major American airline headquartered in Fort Worth, Texas. It is the world's largest airline when measured by fleet size, scheduled passengers carried, and revenue passenger mile.",
    country: "United States",
    headquarters: "Fort Worth, Texas",
    established_year: 1930
  }
])

reviews = Review.create([
  {
    title: "Great Experience",
    description: "Had a wonderful flight with excellent service.",
    score: 5,
    airline: airlines.first
  },
  {
    title: "Average Service",
    description: "Flight was okay, nothing special.",
    score: 3,
    airline: airlines.second
  }
])

admin = User.create!(
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  password: "123456",
  password_confirmation: "123456"
)
user = User.create!(
  name: "Regular User",
  email: "user@example.com",
  role: "user",
  password: "123456",
  password_confirmation: "123456"
)