export interface Package {
  id: string
  name: string
  destination: string
  duration: string
  durationDays: number
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  company: Company
  image: string
  images: string[]
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryDay[]
  hotels: Hotel[]
  transport: string
  meals: string
  travelType: string
  bestDeal?: boolean
  premium?: boolean
}

export interface Company {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  trustScore: number
  established: number
  headquarters: string
  description: string
  totalPackages: number
}

export interface Hotel {
  name: string
  stars: number
  location: string
  nights: number
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
  helpful: number
}

export interface Destination {
  id: string
  name: string
  image: string
  packageCount: number
  startingPrice: number
}

export const companies: Company[] = [
  {
    id: "wanderlust-travels",
    name: "Wanderlust Travels",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    rating: 4.8,
    reviewCount: 2847,
    trustScore: 95,
    established: 2010,
    headquarters: "Mumbai, India",
    description: "Premium travel experiences curated for the modern explorer. We specialize in creating unforgettable journeys across India's most beautiful destinations.",
    totalPackages: 45
  },
  {
    id: "heritage-tours",
    name: "Heritage Tours India",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    rating: 4.6,
    reviewCount: 1923,
    trustScore: 88,
    established: 2005,
    headquarters: "Jaipur, India",
    description: "Specialists in cultural and heritage tourism. Experience the rich history and traditions of India with our expert guides.",
    totalPackages: 38
  },
  {
    id: "adventure-seekers",
    name: "Adventure Seekers",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    rating: 4.7,
    reviewCount: 1456,
    trustScore: 92,
    established: 2015,
    headquarters: "Delhi, India",
    description: "For thrill-seekers and adventure enthusiasts. We offer adrenaline-pumping experiences across mountains, beaches, and deserts.",
    totalPackages: 32
  },
  {
    id: "royal-vacations",
    name: "Royal Vacations",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    rating: 4.9,
    reviewCount: 3241,
    trustScore: 97,
    established: 2008,
    headquarters: "Udaipur, India",
    description: "Luxury travel redefined. Experience royal hospitality and world-class service on every journey with us.",
    totalPackages: 28
  }
]

export const packages: Package[] = [
  {
    id: "rajasthan-royal-heritage",
    name: "Royal Rajasthan Heritage Tour",
    destination: "Rajasthan",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    price: 28999,
    originalPrice: 35999,
    rating: 4.8,
    reviewCount: 456,
    company: companies[0],
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop"
    ],
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace Udaipur", "Desert Safari"],
    inclusions: ["4-star hotels", "All meals", "AC transport", "Guide services", "Entry tickets"],
    exclusions: ["Flights", "Personal expenses", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", description: "Welcome to the Pink City", activities: ["Airport pickup", "Hotel check-in", "Evening at leisure"] },
      { day: 2, title: "Jaipur Sightseeing", description: "Explore the royal heritage", activities: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"] },
      { day: 3, title: "Jaipur to Jodhpur", description: "Journey to the Blue City", activities: ["Drive to Jodhpur", "Mehrangarh Fort", "Jaswant Thada"] },
      { day: 4, title: "Jodhpur to Jaisalmer", description: "Into the Golden Desert", activities: ["Drive to Jaisalmer", "Jaisalmer Fort", "Patwon Ki Haveli"] },
      { day: 5, title: "Desert Safari", description: "Experience the Thar Desert", activities: ["Camel safari", "Desert camp", "Cultural evening"] },
      { day: 6, title: "Jaisalmer to Udaipur", description: "City of Lakes awaits", activities: ["Drive to Udaipur", "Lake Pichola", "City Palace"] },
      { day: 7, title: "Departure", description: "Farewell to Rajasthan", activities: ["Breakfast", "Airport transfer", "Departure"] }
    ],
    hotels: [
      { name: "Trident Jaipur", stars: 4, location: "Jaipur", nights: 2 },
      { name: "Taj Hari Mahal", stars: 4, location: "Jodhpur", nights: 1 },
      { name: "Suryagarh", stars: 4, location: "Jaisalmer", nights: 2 },
      { name: "Taj Lake Palace", stars: 5, location: "Udaipur", nights: 1 }
    ],
    transport: "AC Sedan/SUV",
    meals: "Breakfast + Dinner",
    travelType: "Heritage",
    bestDeal: true
  },
  {
    id: "goa-beach-bliss",
    name: "Goa Beach Bliss Package",
    destination: "Goa",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 15999,
    originalPrice: 19999,
    rating: 4.6,
    reviewCount: 892,
    company: companies[2],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop"
    ],
    highlights: ["Calangute Beach", "Old Goa Churches", "Dudhsagar Falls", "Water Sports"],
    inclusions: ["Beach resort", "Breakfast", "Sightseeing", "Water sports"],
    exclusions: ["Flights", "Lunch/Dinner", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival in Goa", description: "Welcome to the beach paradise", activities: ["Airport pickup", "Resort check-in", "Beach time"] },
      { day: 2, title: "North Goa Tour", description: "Explore the famous beaches", activities: ["Calangute Beach", "Baga Beach", "Aguada Fort"] },
      { day: 3, title: "South Goa Tour", description: "Serene beaches await", activities: ["Colva Beach", "Palolem Beach", "Cabo de Rama"] },
      { day: 4, title: "Adventure Day", description: "Thrill and excitement", activities: ["Water sports", "Dudhsagar Falls", "Spice plantation"] },
      { day: 5, title: "Departure", description: "Goodbye Goa", activities: ["Breakfast", "Airport transfer"] }
    ],
    hotels: [
      { name: "Taj Fort Aguada", stars: 5, location: "Candolim", nights: 4 }
    ],
    transport: "AC Sedan",
    meals: "Breakfast Only",
    travelType: "Beach"
  },
  {
    id: "manali-adventure",
    name: "Manali Adventure Escape",
    destination: "Manali",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    price: 22499,
    originalPrice: 27999,
    rating: 4.7,
    reviewCount: 634,
    company: companies[2],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    ],
    highlights: ["Rohtang Pass", "Solang Valley", "Old Manali", "River Rafting"],
    inclusions: ["Mountain view hotel", "All meals", "Adventure activities", "Transport"],
    exclusions: ["Flights", "Personal expenses", "Permits"],
    itinerary: [
      { day: 1, title: "Delhi to Manali", description: "Journey to the mountains", activities: ["Volvo bus journey", "Scenic views"] },
      { day: 2, title: "Manali Local", description: "Explore the town", activities: ["Hadimba Temple", "Vashisht Hot Springs", "Mall Road"] },
      { day: 3, title: "Solang Valley", description: "Adventure awaits", activities: ["Paragliding", "Zorbing", "Skiing (seasonal)"] },
      { day: 4, title: "Rohtang Pass", description: "Snow point excursion", activities: ["Rohtang Pass", "Snow activities", "Photography"] },
      { day: 5, title: "River Rafting", description: "Thrill on water", activities: ["River rafting", "Old Manali", "Cafe hopping"] },
      { day: 6, title: "Return Journey", description: "Memories to cherish", activities: ["Breakfast", "Return to Delhi"] }
    ],
    hotels: [
      { name: "Snow Valley Resorts", stars: 4, location: "Manali", nights: 5 }
    ],
    transport: "Volvo Bus + Local Transport",
    meals: "All Meals",
    travelType: "Adventure",
    premium: true
  },
  {
    id: "rajasthan-budget-explorer",
    name: "Rajasthan Budget Explorer",
    destination: "Rajasthan",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 14999,
    originalPrice: 18999,
    rating: 4.4,
    reviewCount: 1023,
    company: companies[1],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"
    ],
    highlights: ["Jaipur", "Pushkar", "Ajmer", "Local experiences"],
    inclusions: ["3-star hotels", "Breakfast", "Transport", "Guide"],
    exclusions: ["Flights", "Lunch/Dinner", "Entry tickets"],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", description: "Pink City welcomes you", activities: ["Arrival", "Hotel check-in", "Local market"] },
      { day: 2, title: "Jaipur Sightseeing", description: "Royal heritage tour", activities: ["Amber Fort", "Hawa Mahal", "City Palace"] },
      { day: 3, title: "Jaipur to Pushkar", description: "Sacred town journey", activities: ["Drive to Pushkar", "Pushkar Lake", "Brahma Temple"] },
      { day: 4, title: "Ajmer Excursion", description: "Spiritual experience", activities: ["Ajmer Sharif", "Ana Sagar Lake", "Return to Jaipur"] },
      { day: 5, title: "Departure", description: "End of tour", activities: ["Breakfast", "Airport transfer"] }
    ],
    hotels: [
      { name: "Hotel Pearl Palace", stars: 3, location: "Jaipur", nights: 2 },
      { name: "Hotel Pushkar Palace", stars: 3, location: "Pushkar", nights: 2 }
    ],
    transport: "AC Bus",
    meals: "Breakfast Only",
    travelType: "Budget"
  },
  {
    id: "goa-luxury-retreat",
    name: "Goa Luxury Beach Retreat",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    price: 35999,
    originalPrice: 42999,
    rating: 4.9,
    reviewCount: 234,
    company: companies[3],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    highlights: ["Private beach access", "Spa treatments", "Fine dining", "Yacht cruise"],
    inclusions: ["5-star resort", "All meals", "Spa session", "Yacht cruise", "Airport transfers"],
    exclusions: ["Flights", "Personal shopping", "Extra activities"],
    itinerary: [
      { day: 1, title: "Royal Arrival", description: "Luxury begins", activities: ["VIP airport pickup", "Resort check-in", "Welcome dinner"] },
      { day: 2, title: "Beach & Spa", description: "Relaxation day", activities: ["Private beach", "Spa treatment", "Sunset cocktails"] },
      { day: 3, title: "Yacht Day", description: "Sailing in style", activities: ["Yacht cruise", "Snorkeling", "Gourmet lunch"] },
      { day: 4, title: "Departure", description: "Until next time", activities: ["Breakfast", "VIP transfer"] }
    ],
    hotels: [
      { name: "W Goa", stars: 5, location: "Vagator", nights: 3 }
    ],
    transport: "Luxury SUV",
    meals: "All Inclusive",
    travelType: "Luxury",
    premium: true
  },
  {
    id: "manali-honeymoon",
    name: "Manali Honeymoon Special",
    destination: "Manali",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 32999,
    originalPrice: 39999,
    rating: 4.8,
    reviewCount: 567,
    company: companies[3],
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop"
    ],
    highlights: ["Couple spa", "Candlelight dinner", "Private tours", "Mountain views"],
    inclusions: ["Luxury cottage", "All meals", "Couple spa", "Private sightseeing", "Candlelight dinner"],
    exclusions: ["Flights", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Romantic Arrival", description: "Love in the mountains", activities: ["Flight to Kullu", "Private transfer", "Room decorated"] },
      { day: 2, title: "Couple Sightseeing", description: "Explore together", activities: ["Hadimba Temple", "Vashisht", "Couple spa"] },
      { day: 3, title: "Solang Adventure", description: "Thrills together", activities: ["Solang Valley", "Paragliding for two", "Cozy evening"] },
      { day: 4, title: "Leisure Day", description: "Quality time", activities: ["Sleep in", "Cafe hopping", "Candlelight dinner"] },
      { day: 5, title: "Farewell", description: "Memories forever", activities: ["Breakfast", "Airport transfer"] }
    ],
    hotels: [
      { name: "The Himalayan", stars: 5, location: "Manali", nights: 4 }
    ],
    transport: "Private SUV",
    meals: "All Meals + Special Dinners",
    travelType: "Honeymoon"
  },
  {
    id: "rajasthan-photography",
    name: "Rajasthan Photography Tour",
    destination: "Rajasthan",
    duration: "8 Days / 7 Nights",
    durationDays: 8,
    price: 45999,
    originalPrice: 52999,
    rating: 4.9,
    reviewCount: 189,
    company: companies[0],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"
    ],
    highlights: ["Golden hour shoots", "Heritage locations", "Local life", "Desert sunrise"],
    inclusions: ["Heritage hotels", "All meals", "Photography guide", "Model coordination", "Transport"],
    exclusions: ["Camera equipment", "Flights", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Jaipur Arrival", description: "Setup and orientation", activities: ["Arrival", "Equipment check", "Evening recce"] },
      { day: 2, title: "Jaipur Shoot", description: "Pink City captures", activities: ["Sunrise at Amber", "Hawa Mahal", "Street photography"] },
      { day: 3, title: "Jodhpur", description: "Blue City frames", activities: ["Drive to Jodhpur", "Blue houses", "Fort photography"] },
      { day: 4, title: "Jodhpur Markets", description: "Local life", activities: ["Sardar Market", "Clock tower", "Portrait sessions"] },
      { day: 5, title: "Jaisalmer", description: "Golden City", activities: ["Drive to Jaisalmer", "Fort at golden hour", "Haveli details"] },
      { day: 6, title: "Desert Shoot", description: "Sand dune magic", activities: ["Desert sunrise", "Camel portraits", "Star photography"] },
      { day: 7, title: "Udaipur", description: "City of Lakes", activities: ["Drive to Udaipur", "Lake photography", "Palace shots"] },
      { day: 8, title: "Departure", description: "Review and farewell", activities: ["Photo review", "Departure"] }
    ],
    hotels: [
      { name: "Rambagh Palace", stars: 5, location: "Jaipur", nights: 2 },
      { name: "Umaid Bhawan", stars: 5, location: "Jodhpur", nights: 2 },
      { name: "Suryagarh", stars: 5, location: "Jaisalmer", nights: 2 },
      { name: "Oberoi Udaivilas", stars: 5, location: "Udaipur", nights: 1 }
    ],
    transport: "Luxury SUV",
    meals: "All Inclusive",
    travelType: "Photography"
  },
  {
    id: "goa-backpacker",
    name: "Goa Backpacker Special",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    price: 8999,
    originalPrice: 11999,
    rating: 4.3,
    reviewCount: 1567,
    company: companies[1],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"
    ],
    highlights: ["Hostel stays", "Beach parties", "Local food", "Group activities"],
    inclusions: ["Hostel bed", "Breakfast", "Group transport", "Beach activities"],
    exclusions: ["Flights", "Lunch/Dinner", "Nightlife expenses"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Meet the crew", activities: ["Arrival", "Hostel check-in", "Beach sunset"] },
      { day: 2, title: "North Goa", description: "Beach hopping", activities: ["Anjuna", "Vagator", "Flea market"] },
      { day: 3, title: "Adventure Day", description: "Fun in the sun", activities: ["Water sports", "Old Goa", "Night market"] },
      { day: 4, title: "Departure", description: "New friends, great memories", activities: ["Breakfast", "Departure"] }
    ],
    hotels: [
      { name: "Jungle Hostel", stars: 2, location: "Anjuna", nights: 3 }
    ],
    transport: "Shared Vehicle",
    meals: "Breakfast Only",
    travelType: "Budget",
    bestDeal: true
  },
  {
    id: "manali-family-fun",
    name: "Manali Family Fun Package",
    destination: "Manali",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    price: 28999,
    originalPrice: 34999,
    rating: 4.6,
    reviewCount: 423,
    company: companies[0],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop"
    ],
    highlights: ["Family activities", "Safe adventures", "Kid-friendly hotels", "Scenic tours"],
    inclusions: ["Family rooms", "All meals", "Family activities", "Childcare options", "Transport"],
    exclusions: ["Flights", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Family Arrival", description: "Mountain welcome", activities: ["Arrival", "Family suite check-in", "Kids play area"] },
      { day: 2, title: "Local Sightseeing", description: "Easy day out", activities: ["Hadimba Temple", "Van Vihar", "Mall Road"] },
      { day: 3, title: "Solang Valley", description: "Family adventure", activities: ["Snow point", "Gondola ride", "Safe activities"] },
      { day: 4, title: "Nature Day", description: "Scenic beauty", activities: ["Jogini Waterfalls", "Apple orchards", "Picnic"] },
      { day: 5, title: "Leisure", description: "Relax and enjoy", activities: ["Sleep in", "River walk", "Shopping"] },
      { day: 6, title: "Departure", description: "Family memories", activities: ["Breakfast", "Departure"] }
    ],
    hotels: [
      { name: "Club Mahindra", stars: 4, location: "Manali", nights: 5 }
    ],
    transport: "Family SUV",
    meals: "All Meals",
    travelType: "Family"
  },
  {
    id: "rajasthan-wildlife",
    name: "Rajasthan Wildlife Safari",
    destination: "Rajasthan",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    price: 38999,
    originalPrice: 45999,
    rating: 4.7,
    reviewCount: 312,
    company: companies[2],
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"
    ],
    highlights: ["Tiger safari", "Ranthambore", "Bird watching", "Jungle stays"],
    inclusions: ["Jungle lodge", "All meals", "Safari drives", "Naturalist guide", "Transport"],
    exclusions: ["Flights", "Camera fees", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival Jaipur", description: "Gateway to wildlife", activities: ["Arrival", "Transfer to lodge", "Evening briefing"] },
      { day: 2, title: "First Safari", description: "Into the wild", activities: ["Morning safari", "Lunch", "Evening safari"] },
      { day: 3, title: "Tiger Territory", description: "Deep jungle", activities: ["Full day safari", "Photography", "Night sounds"] },
      { day: 4, title: "Bird Watching", description: "Feathered friends", activities: ["Bird safari", "Ranthambore Fort", "Village walk"] },
      { day: 5, title: "Final Safari", description: "Last chances", activities: ["Morning safari", "Jaipur transfer", "City stay"] },
      { day: 6, title: "Departure", description: "Wild memories", activities: ["Breakfast", "Departure"] }
    ],
    hotels: [
      { name: "Oberoi Vanyavilas", stars: 5, location: "Ranthambore", nights: 4 },
      { name: "ITC Rajputana", stars: 5, location: "Jaipur", nights: 1 }
    ],
    transport: "Safari Jeeps + AC SUV",
    meals: "All Inclusive",
    travelType: "Wildlife"
  },
  {
    id: "goa-wellness",
    name: "Goa Wellness & Yoga Retreat",
    destination: "Goa",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    price: 42999,
    originalPrice: 49999,
    rating: 4.8,
    reviewCount: 198,
    company: companies[3],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
    ],
    highlights: ["Daily yoga", "Meditation", "Ayurvedic treatments", "Organic food"],
    inclusions: ["Wellness resort", "All organic meals", "Daily yoga", "Spa treatments", "Meditation"],
    exclusions: ["Flights", "Personal treatments", "Shopping"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Begin your journey", activities: ["Welcome ritual", "Consultation", "Light dinner"] },
      { day: 2, title: "Yoga Basics", description: "Foundation practice", activities: ["Morning yoga", "Meditation", "Ayurvedic lunch"] },
      { day: 3, title: "Deep Practice", description: "Advanced sessions", activities: ["Pranayama", "Yoga nidra", "Beach walk"] },
      { day: 4, title: "Spa Day", description: "Healing touch", activities: ["Abhyanga massage", "Shirodhara", "Sound healing"] },
      { day: 5, title: "Nature Connect", description: "Earth grounding", activities: ["Sunrise yoga", "Nature walk", "Journaling"] },
      { day: 6, title: "Integration", description: "Bringing it together", activities: ["Full practice", "Life coaching", "Celebration dinner"] },
      { day: 7, title: "Departure", description: "New beginning", activities: ["Final meditation", "Departure"] }
    ],
    hotels: [
      { name: "Ashiyana Yoga Village", stars: 4, location: "Mandrem", nights: 6 }
    ],
    transport: "Mindful Transfer",
    meals: "All Organic Meals",
    travelType: "Wellness"
  },
  {
    id: "manali-skiing",
    name: "Manali Skiing Adventure",
    destination: "Manali",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 34999,
    originalPrice: 41999,
    rating: 4.5,
    reviewCount: 156,
    company: companies[2],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop"
    ],
    highlights: ["Skiing lessons", "Snow activities", "Equipment included", "Certified instructors"],
    inclusions: ["Ski resort", "All meals", "Equipment rental", "Skiing lessons", "Insurance"],
    exclusions: ["Flights", "Personal gear", "Extra activities"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Meet the slopes", activities: ["Arrival", "Equipment fitting", "Orientation"] },
      { day: 2, title: "Beginner Slopes", description: "First lessons", activities: ["Basic techniques", "Balance training", "Practice runs"] },
      { day: 3, title: "Intermediate", description: "Level up", activities: ["Advanced turns", "Speed control", "Longer runs"] },
      { day: 4, title: "Full Day Skiing", description: "Put it together", activities: ["Full day on slopes", "Video analysis", "Awards"] },
      { day: 5, title: "Departure", description: "Ski you later", activities: ["Morning run", "Departure"] }
    ],
    hotels: [
      { name: "Solang Ski Resort", stars: 4, location: "Solang", nights: 4 }
    ],
    transport: "Resort Shuttle",
    meals: "All Meals",
    travelType: "Adventure"
  }
]

export const destinations: Destination[] = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    packageCount: 4,
    startingPrice: 14999
  },
  {
    id: "goa",
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    packageCount: 4,
    startingPrice: 8999
  },
  {
    id: "manali",
    name: "Manali",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
    packageCount: 4,
    startingPrice: 22499
  },
  {
    id: "kerala",
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    packageCount: 6,
    startingPrice: 12999
  },
  {
    id: "ladakh",
    name: "Ladakh",
    image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=800&h=600&fit=crop",
    packageCount: 3,
    startingPrice: 28999
  },
  {
    id: "varanasi",
    name: "Varanasi",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
    packageCount: 4,
    startingPrice: 6999
  }
]

export const reviews: Review[] = [
  {
    id: "1",
    user: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely amazing experience! The Royal Rajasthan tour exceeded all expectations. Hotels were luxurious and the guide was incredibly knowledgeable.",
    helpful: 24
  },
  {
    id: "2",
    user: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    date: "1 month ago",
    comment: "Great value for money. The desert safari was the highlight of our trip. Only minor issue was the long drive between cities.",
    helpful: 18
  },
  {
    id: "3",
    user: "Ananya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    date: "3 weeks ago",
    comment: "Perfect honeymoon package! Every detail was taken care of. The candlelight dinner setup was so romantic. Highly recommend!",
    helpful: 32
  },
  {
    id: "4",
    user: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4,
    date: "2 months ago",
    comment: "Adventure activities were top-notch. The river rafting and paragliding experiences were safe and thrilling. Would book again!",
    helpful: 15
  }
]

export const testimonials = [
  {
    id: "1",
    name: "Meera Kapoor",
    role: "Solo Traveler",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    comment: "TripCompare AI made planning my solo trip so easy. The comparison feature helped me find the perfect package within my budget.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    destination: "Jaipur",
    title: "Postcard from Jaipur",
    collageImage: "/illustrations/vintage-elephant.png",
    secondaryCollage: "/illustrations/indian-food.png"
  },
  {
    id: "2",
    name: "Arjun & Neha",
    role: "Honeymooners",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    comment: "We used the AI advisor and it recommended the perfect honeymoon package. Every moment was magical!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    destination: "Udaipur",
    title: "Greetings from Udaipur",
    collageImage: "/illustrations/udaipur-collage.png"
  },
  {
    id: "3",
    name: "The Mehta Family",
    role: "Family Vacation",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    comment: "Finding a family-friendly package that suited everyone was never this simple. The trust scores gave us confidence in our choice.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    destination: "Kerala",
    title: "Postcard from Kerala",
    collageImage: "/illustrations/kerala-collage.png"
  },
  {
    id: "4",
    name: "Vikram Malhotra",
    role: "Adventure Seeker",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    comment: "The beach activities and water sports ratings let us compare Goa packages accurately. Highly organized comparison engine!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    destination: "Goa",
    title: "Greetings from Goa",
    collageImage: "/illustrations/goa-collage.png"
  }
]

export function getPackageById(id: string): Package | undefined {
  return packages.find(p => p.id === id)
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id)
}

export function getPackagesByCompany(companyId: string): Package[] {
  return packages.filter(p => p.company.id === companyId)
}

export function getPackagesByDestination(destination: string): Package[] {
  return packages.filter(p => p.destination.toLowerCase() === destination.toLowerCase())
}

export function filterPackages(filters: {
  destination?: string
  minBudget?: number
  maxBudget?: number
  minDuration?: number
  maxDuration?: number
  minRating?: number
  travelType?: string
}): Package[] {
  return packages.filter(p => {
    if (filters.destination && p.destination.toLowerCase() !== filters.destination.toLowerCase()) return false
    if (filters.minBudget && p.price < filters.minBudget) return false
    if (filters.maxBudget && p.price > filters.maxBudget) return false
    if (filters.minDuration && p.durationDays < filters.minDuration) return false
    if (filters.maxDuration && p.durationDays > filters.maxDuration) return false
    if (filters.minRating && p.rating < filters.minRating) return false
    if (filters.travelType && p.travelType.toLowerCase() !== filters.travelType.toLowerCase()) return false
    return true
  })
}
