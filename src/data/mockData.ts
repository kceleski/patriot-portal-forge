
export interface MockFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviews: number;
  price_min: number;
  price_max: number;
  capacity: number;
  current_availability: number;
  amenities: string[];
  services: string[];
  description: string;
  images: string[];
  virtual_tour_url?: string;
}

export interface MockUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'family' | 'healthcare' | 'agent' | 'facility';
  subscription_tier: 'essentials' | 'elevate' | 'pinnacle';
  organization?: string;
  phone: string;
}

export interface MockScenario {
  id: string;
  title: string;
  description: string;
  user: MockUser;
  context: string;
  workflow_steps: string[];
  expected_outcome: string;
}

// Mock Facilities for Demo
export const mockFacilities: MockFacility[] = [
  {
    id: "1",
    name: "Sunset Manor Assisted Living",
    type: "Assisted Living",
    address: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    phone: "(415) 555-0123",
    email: "info@sunsetmanor.com",
    website: "www.sunsetmanor.com",
    rating: 4.8,
    reviews: 127,
    price_min: 4500,
    price_max: 7200,
    capacity: 85,
    current_availability: 3,
    amenities: ["24/7 Nursing", "Memory Care", "Dining Services", "Transportation", "Activities", "Pet Friendly"],
    services: ["Medication Management", "Physical Therapy", "Occupational Therapy", "Social Services"],
    description: "A premier assisted living community offering personalized care in a warm, home-like environment with stunning bay views.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    virtual_tour_url: "https://example.com/virtual-tour"
  },
  {
    id: "2",
    name: "Golden Years Memory Care",
    type: "Memory Care",
    address: "456 Pine Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    phone: "(415) 555-0456",
    email: "contact@goldenyears.com",
    website: "www.goldenyears.com",
    rating: 4.9,
    reviews: 89,
    price_min: 6000,
    price_max: 9500,
    capacity: 42,
    current_availability: 2,
    amenities: ["Secure Environment", "Specialized Staff", "Therapeutic Activities", "Family Support"],
    services: ["Dementia Care", "Alzheimer's Support", "Behavioral Management", "Nutritional Support"],
    description: "Specialized memory care facility designed specifically for residents with Alzheimer's and other forms of dementia.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  {
    id: "3",
    name: "Pacific Heights Independent Living",
    type: "Independent Living",
    address: "789 California Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94108",
    phone: "(415) 555-0789",
    email: "hello@pacificheights.com",
    website: "www.pacificheights.com",
    rating: 4.6,
    reviews: 203,
    price_min: 3200,
    price_max: 5800,
    capacity: 120,
    current_availability: 8,
    amenities: ["Fitness Center", "Swimming Pool", "Library", "Concierge", "Dining Room", "Beauty Salon"],
    services: ["Housekeeping", "Maintenance", "Transportation", "Activities Coordination"],
    description: "Luxury independent living community for active seniors who want to maintain their independence while enjoying resort-style amenities.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  }
];

// Mock Users for Demo
export const mockUsers: MockUser[] = [
  {
    id: "family-1",
    email: "sarah.johnson@email.com",
    first_name: "Sarah",
    last_name: "Johnson",
    user_type: "family",
    subscription_tier: "elevate",
    phone: "(555) 123-4567"
  },
  {
    id: "agent-1",
    email: "mike.rodriguez@placementpro.com",
    first_name: "Mike",
    last_name: "Rodriguez",
    user_type: "agent",
    subscription_tier: "pinnacle",
    organization: "PlacementPro Services",
    phone: "(555) 234-5678"
  },
  {
    id: "healthcare-1",
    email: "dr.chen@hospitalnetwork.com",
    first_name: "Lisa",
    last_name: "Chen",
    user_type: "healthcare",
    subscription_tier: "elevate",
    organization: "Bay Area Hospital Network",
    phone: "(555) 345-6789"
  },
  {
    id: "facility-1",
    email: "admin@sunsetmanor.com",
    first_name: "Robert",
    last_name: "Thompson",
    user_type: "facility",
    subscription_tier: "pinnacle",
    organization: "Sunset Manor Assisted Living",
    phone: "(555) 456-7890"
  }
];

// Mock Scenarios for Presentation
export const mockScenarios: MockScenario[] = [
  {
    id: "scenario-1",
    title: "Family Searching for Memory Care",
    description: "Adult daughter looking for memory care facility for her mother with early-stage Alzheimer's",
    user: mockUsers[0],
    context: "Sarah's 78-year-old mother was recently diagnosed with early-stage Alzheimer's. She lives alone but is becoming increasingly forgetful and had a recent fall. Sarah lives 30 minutes away and works full-time, making daily care difficult.",
    workflow_steps: [
      "Complete family onboarding and assessment",
      "Use AI assistant to understand care needs",
      "Search for memory care facilities in target area",
      "Compare 3-4 top facilities using comparison tool",
      "Schedule virtual tours",
      "Connect with placement agent for consultation",
      "Arrange in-person visits",
      "Complete facility application and intake forms"
    ],
    expected_outcome: "Sarah finds a suitable memory care facility within her budget, schedules a move-in date, and feels confident about her mother's care."
  },
  {
    id: "scenario-2",
    title: "Healthcare Professional Managing Patient Referrals",
    description: "Hospital discharge planner coordinating care transitions for multiple patients",
    user: mockUsers[2],
    context: "Dr. Chen works as a discharge planner at a busy hospital. She has 5 patients who need immediate placement in skilled nursing or assisted living facilities. She needs to coordinate with families, verify insurance coverage, and ensure appropriate care levels.",
    workflow_steps: [
      "Review patient case load in healthcare dashboard",
      "Use AI assistant to match patient needs with facility capabilities",
      "Submit electronic referrals to multiple facilities",
      "Track referral status and facility responses",
      "Coordinate with families using secure messaging",
      "Generate care transition documentation",
      "Monitor placement outcomes and follow-up care"
    ],
    expected_outcome: "All 5 patients are successfully placed in appropriate facilities with proper documentation and family satisfaction."
  },
  {
    id: "scenario-3",
    title: "Placement Agent Managing Multiple Clients",
    description: "Independent placement agent juggling 12 active clients while building facility relationships",
    user: mockUsers[1],
    context: "Mike is an experienced placement agent with 12 active family clients in various stages of the placement process. He's also working to expand his network of facility partnerships and needs to track commissions and manage his growing business.",
    workflow_steps: [
      "Review client pipeline in CRM dashboard",
      "Use facility map to identify new partnership opportunities",
      "Schedule facility visits and contract negotiations",
      "Update client families on available options",
      "Coordinate facility tours for multiple families",
      "Use document builder to create custom agreements",
      "Track commission payments and business metrics",
      "Generate monthly performance reports"
    ],
    expected_outcome: "Mike successfully places 8 clients this month, signs 3 new facility partnerships, and increases his monthly commission by 25%."
  },
  {
    id: "scenario-4",
    title: "Facility Increasing Occupancy Rates",
    description: "Assisted living facility director working to improve marketing and fill vacant units",
    user: mockUsers[3],
    context: "Robert manages a 85-unit assisted living facility that's currently at 75% occupancy. He wants to improve their online presence, better showcase their amenities, and streamline the inquiry-to-move-in process to increase occupancy to 95%.",
    workflow_steps: [
      "Update facility profile with new photos and virtual tour",
      "Configure automated lead response system",
      "Create targeted marketing campaigns for specific care types",
      "Host virtual webinars for families",
      "Track inquiry sources and conversion rates",
      "Optimize pricing strategy based on market analysis",
      "Train staff on using the platform for lead management",
      "Monitor competitor analysis and adjust positioning"
    ],
    expected_outcome: "The facility increases occupancy to 92% within 3 months and establishes a sustainable lead generation process."
  }
];

// Mock Search Results
export const mockSearchResults = [
  {
    query: "memory care facilities San Francisco",
    results: mockFacilities.filter(f => f.type === "Memory Care"),
    timestamp: new Date().toISOString(),
    user_id: "family-1"
  },
  {
    query: "assisted living near me",
    results: mockFacilities.filter(f => f.type === "Assisted Living"),
    timestamp: new Date().toISOString(),
    user_id: "family-1"
  }
];
