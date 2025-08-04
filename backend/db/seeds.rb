airlines = Airline.create([
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
