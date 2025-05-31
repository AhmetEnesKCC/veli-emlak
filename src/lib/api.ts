const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: number;
}

export interface Property {
  id: number;
  host_id: number;
  amenities_id: number;
  property_name: string;
  street_number: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  image_url: string;
  latitude: number;
  longitude: number;
  host: Host;
  amenities: Amenities;
  room_rates: RoomRate[];
  bookings?: Booking[];
  reviews?: Review[];
}

export interface Host {
  id: number;
  first_name: string;
  last_name: string;
  host_since: string;
  username: string;
  phone_number: string;
  email: string;
}

export interface Amenities {
  id: number;
  property_type: string;
  urban_rural_suburban: string;
  square_footage: string;
  number_beds: string;
  number_bedrooms: string;
  number_bathrooms: number;
  air_conditioning: string;
  wifi: string;
  pets: string;
  smoke_free: string;
  parking: string;
  laundry_facilities: string;
  swimming_pool: string;
  accessibility: string;
}

export interface RoomRate {
  id: number;
  property_id: number;
  weekday_rate: number;
  weekend_rate: number;
  person_add_on_price: number;
  tax_rate: number;
}

export interface Booking {
  id: number;
  guest_id: number;
  property_id: number;
  transaction_id: number;
  check_in_date: string;
  check_out_date: string;
}

export interface Review {
  id: number;
  guest_id: number;
  property_id: number;
  rating: string;
  comments: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface SearchParams {
  city?: string;
  state?: string;
  country?: string;
  min_price?: number;
  max_price?: number;
}

export interface CreatePropertyRequest {
  property_name: string;
  street_number: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  property_type: string;
  urban_rural_suburban: string;
  square_footage: string;
  number_beds: string;
  number_bedrooms: string;
  number_bathrooms: number;
  air_conditioning: string;
  wifi: string;
  pets: string;
  smoke_free: string;
  parking: string;
  laundry_facilities: string;
  swimming_pool: string;
  accessibility: string;
  room_rates?: {
    weekday_rate: number;
    weekend_rate: number;
    person_add_on_price: number;
    tax_rate: number;
  };
}

export interface ChatbotRequest {
  message: string;
}

export interface ChatbotResponse {
  response: string;
  properties?: Property[];
  options?: string[];
}

// Helper function to get token from localStorage
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Helper function to create headers with auth
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

// API functions
export const authAPI = {
  async login(data: LoginRequest) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  async signup(data: SignupRequest) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Signup failed');
    }
    
    return response.json();
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  isAuthenticated(): boolean {
    return getAuthToken() !== null;
  }
};

export const propertyAPI = {
  async getAll(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/properties`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    
    const result = await response.json();
    return result.data;
  },

  async getById(id: number): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }
    
    const result = await response.json();
    return result.data;
  },

  async search(params: SearchParams): Promise<Property[]> {
    const searchParams = new URLSearchParams();
    
    if (params.city) searchParams.append('city', params.city);
    if (params.state) searchParams.append('state', params.state);
    if (params.country) searchParams.append('country', params.country);
    if (params.min_price) searchParams.append('min_price', params.min_price.toString());
    if (params.max_price) searchParams.append('max_price', params.max_price.toString());
    
    const response = await fetch(`${API_BASE_URL}/properties/search?${searchParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to search properties');
    }
    
    const result = await response.json();
    return result.data;
  },

  async create(data: CreatePropertyRequest): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create property');
    }
    
    const result = await response.json();
    return result.data;
  },

  async getMyProperties(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/my-properties`, {
      headers: createHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch my properties');
    }
    
    const result = await response.json();
    return result.data;
  }
};

export const chatbotAPI = {
  async query(data: ChatbotRequest): Promise<ChatbotResponse> {
    const response = await fetch(`${API_BASE_URL}/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Chatbot query failed');
    }
    
    return response.json();
  }
}; 