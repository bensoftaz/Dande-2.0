import { 
  hotels, 
  flights, 
  transport, 
  bookings,
  users,
  type Hotel, 
  type Flight, 
  type Transport, 
  type Booking,
  type User,
  type InsertHotel, 
  type InsertFlight, 
  type InsertTransport, 
  type InsertBooking,
  type UpsertUser,
  type SearchFilters
} from "@shared/schema";

export interface IStorage {
  // Hotels
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  getFeaturedHotels(): Promise<Hotel[]>;
  searchHotels(filters: SearchFilters): Promise<Hotel[]>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;

  // Flights
  getFlights(): Promise<Flight[]>;
  getFlight(id: number): Promise<Flight | undefined>;
  searchFlights(filters: SearchFilters): Promise<Flight[]>;
  createFlight(flight: InsertFlight): Promise<Flight>;

  // Transport
  getTransport(): Promise<Transport[]>;
  getTransportById(id: number): Promise<Transport | undefined>;
  searchTransport(filters: SearchFilters): Promise<Transport[]>;
  createTransport(transport: InsertTransport): Promise<Transport>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private hotels: Map<number, Hotel>;
  private flights: Map<number, Flight>;
  private transport: Map<number, Transport>;
  private bookings: Map<number, Booking>;
  private users: Map<string, User>;
  private currentHotelId: number;
  private currentFlightId: number;
  private currentTransportId: number;
  private currentBookingId: number;

  constructor() {
    this.hotels = new Map();
    this.flights = new Map();
    this.transport = new Map();
    this.bookings = new Map();
    this.users = new Map();
    this.currentHotelId = 1;
    this.currentFlightId = 1;
    this.currentTransportId = 1;
    this.currentBookingId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize hotels
    const hotelData: InsertHotel[] = [
      {
        name: "Victoria Falls Hotel",
        location: "Victoria Falls, Zimbabwe",
        city: "Victoria Falls",
        description: "Luxury hotel with spectacular views of Victoria Falls",
        price: "180",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Pool", "Restaurant", "Spa", "Room Service"],
        featured: true
      },
      {
        name: "Harare Rainbow Hotel",
        location: "Harare, Zimbabwe",
        city: "Harare",
        description: "Modern business hotel in the heart of Harare",
        price: "120",
        rating: "4.3",
        imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Business Center", "Restaurant", "Gym"],
        featured: true
      },
      {
        name: "Bulawayo Lodge",
        location: "Bulawayo, Zimbabwe",
        city: "Bulawayo",
        description: "Charming lodge with traditional Zimbabwean hospitality",
        price: "95",
        rating: "4.1",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Restaurant", "Garden", "Parking"],
        featured: true
      },
      {
        name: "Harare Luxury Suites",
        location: "Harare, Zimbabwe",
        city: "Harare",
        description: "Executive suites for business travelers",
        price: "150",
        rating: "4.5",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Concierge", "Gym", "Restaurant"],
        featured: false
      },
      {
        name: "Victoria Falls Safari Lodge",
        location: "Victoria Falls, Zimbabwe",
        city: "Victoria Falls",
        description: "Safari-themed lodge near the falls",
        price: "200",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Pool", "Safari Tours", "Restaurant"],
        featured: false
      },
      {
        name: "Hwange Safari Lodge",
        location: "Hwange National Park, Zimbabwe",
        city: "Hwange",
        description: "Luxury safari lodge in Zimbabwe's premier wildlife destination",
        price: "250",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Game Drives", "Restaurant", "Spa", "Pool"],
        featured: true
      },
      {
        name: "Matobo Hills Lodge",
        location: "Matobo National Park, Zimbabwe",
        city: "Matobo",
        description: "Boutique lodge among ancient granite formations",
        price: "180",
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Rock Art Tours", "Restaurant", "Pool"],
        featured: false
      },
      {
        name: "Great Zimbabwe Hotel",
        location: "Masvingo, Zimbabwe",
        city: "Masvingo",
        description: "Historic hotel near the Great Zimbabwe Ruins",
        price: "110",
        rating: "4.2",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["Free WiFi", "Heritage Tours", "Restaurant", "Garden"],
        featured: false
      }
    ];

    hotelData.forEach(hotel => this.createHotel(hotel));

    // Initialize flights
    const flightData: InsertFlight[] = [
      // Domestic flights
      {
        airline: "Air Zimbabwe",
        from: "Harare",
        to: "Victoria Falls",
        fromCode: "HRE",
        toCode: "VFA",
        price: "89",
        duration: "1h 30m",
        frequency: "Daily flights",
        departureTime: "08:00",
        arrivalTime: "09:30",
        flightType: "domestic",
        returnPrice: "89",
        returnDuration: "1h 30m",
        returnDepartureTime: "16:00",
        returnArrivalTime: "17:30",
        country: "Zimbabwe",
        timezone: "Africa/Harare"
      },
      {
        airline: "Air Zimbabwe",
        from: "Harare",
        to: "Bulawayo",
        fromCode: "HRE",
        toCode: "BUQ",
        price: "65",
        duration: "1h 15m",
        frequency: "Daily flights",
        departureTime: "10:00",
        arrivalTime: "11:15",
        flightType: "domestic",
        returnPrice: "65",
        returnDuration: "1h 15m",
        returnDepartureTime: "14:00",
        returnArrivalTime: "15:15",
        country: "Zimbabwe",
        timezone: "Africa/Harare"
      },
      // International flights
      {
        airline: "South African Airways",
        from: "Harare",
        to: "Johannesburg",
        fromCode: "HRE",
        toCode: "JNB",
        price: "245",
        duration: "2h 10m",
        frequency: "3 flights daily",
        departureTime: "07:30",
        arrivalTime: "09:40",
        flightType: "international",
        returnPrice: "245",
        returnDuration: "2h 10m",
        returnDepartureTime: "18:30",
        returnArrivalTime: "20:40",
        country: "South Africa",
        timezone: "Africa/Johannesburg"
      },
      {
        airline: "Emirates",
        from: "Harare",
        to: "Dubai",
        fromCode: "HRE",
        toCode: "DXB",
        price: "685",
        duration: "8h 45m",
        frequency: "Daily flights",
        departureTime: "23:50",
        arrivalTime: "08:35",
        flightType: "international",
        returnPrice: "685",
        returnDuration: "8h 30m",
        returnDepartureTime: "10:20",
        returnArrivalTime: "18:50",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai"
      },
      {
        airline: "British Airways",
        from: "Harare",
        to: "London",
        fromCode: "HRE",
        toCode: "LHR",
        price: "890",
        duration: "11h 30m",
        frequency: "4 flights weekly",
        departureTime: "21:45",
        arrivalTime: "09:15",
        flightType: "international",
        returnPrice: "890",
        returnDuration: "11h 45m",
        returnDepartureTime: "13:30",
        returnArrivalTime: "01:15",
        country: "United Kingdom",
        timezone: "Europe/London"
      },
      {
        airline: "Kenya Airways",
        from: "Harare",
        to: "Nairobi",
        fromCode: "HRE",
        toCode: "NBO",
        price: "195",
        duration: "3h 25m",
        frequency: "Daily flights",
        departureTime: "14:30",
        arrivalTime: "17:55",
        flightType: "international",
        returnPrice: "195",
        returnDuration: "3h 25m",
        returnDepartureTime: "19:30",
        returnArrivalTime: "22:55",
        country: "Kenya",
        timezone: "Africa/Nairobi"
      }
    ];

    flightData.forEach(flight => this.createFlight(flight));

    // Initialize transport
    const transportData: InsertTransport[] = [
      {
        name: "Mercedes-Benz S-Class",
        type: "luxury-sedan",
        description: "Ultimate luxury sedan with premium amenities and professional chauffeur",
        price: "75",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Chauffeur", "Premium Leather", "Climate Control", "WiFi", "Mini Bar", "Massage Seats"],
        capacity: 4
      },
      {
        name: "Mercedes-Benz GLE SUV",
        type: "luxury-suv",
        description: "Spacious luxury SUV perfect for families and groups",
        price: "95",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Driver", "Premium Interior", "Panoramic Roof", "Premium Sound", "Tinted Windows", "USB Charging"],
        capacity: 7
      },
      {
        name: "Mercedes-Benz V-Class",
        type: "executive-van",
        description: "Executive van with conference facilities for business travel",
        price: "120",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Driver", "Conference Setup", "WiFi", "Refreshments", "Meeting Table", "Power Outlets"],
        capacity: 12
      },
      {
        name: "BMW 7 Series",
        type: "luxury-sedan",
        description: "Premium executive sedan with cutting-edge technology",
        price: "70",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Chauffeur", "Executive Lounge", "Advanced Tech", "Premium Audio", "Ambient Lighting"],
        capacity: 4
      },
      {
        name: "Range Rover Autobiography",
        type: "luxury-suv",
        description: "British luxury SUV with unparalleled comfort and style",
        price: "110",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Driver", "Luxury Interior", "Off-Road Capability", "Premium Sound", "Rear Entertainment"],
        capacity: 7
      },
      {
        name: "Audi A8 Long",
        type: "luxury-sedan",
        description: "Flagship luxury sedan with exceptional comfort and technology",
        price: "65",
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        features: ["Professional Driver", "Executive Package", "Matrix LED", "Bang & Olufsen Audio", "Massage Function"],
        capacity: 4
      }
    ];

    transportData.forEach(transport => this.createTransport(transport));
  }

  // Hotels
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async getFeaturedHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.featured);
  }

  async searchHotels(filters: SearchFilters): Promise<Hotel[]> {
    let results = Array.from(this.hotels.values());

    if (filters.destination) {
      results = results.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.destination!.toLowerCase()) ||
        hotel.city.toLowerCase().includes(filters.destination!.toLowerCase())
      );
    }

    return results;
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = this.currentHotelId++;
    const hotel: Hotel = { ...insertHotel, id };
    this.hotels.set(id, hotel);
    return hotel;
  }

  // Flights
  async getFlights(): Promise<Flight[]> {
    return Array.from(this.flights.values());
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    return this.flights.get(id);
  }

  async searchFlights(filters: SearchFilters): Promise<Flight[]> {
    let results = Array.from(this.flights.values());

    if (filters.from) {
      results = results.filter(flight => 
        flight.from.toLowerCase().includes(filters.from!.toLowerCase()) ||
        flight.fromCode.toLowerCase().includes(filters.from!.toLowerCase())
      );
    }

    if (filters.to) {
      results = results.filter(flight => 
        flight.to.toLowerCase().includes(filters.to!.toLowerCase()) ||
        flight.toCode.toLowerCase().includes(filters.to!.toLowerCase())
      );
    }

    if (filters.flightType) {
      results = results.filter(flight => 
        flight.flightType === filters.flightType
      );
    }

    return results;
  }

  async createFlight(insertFlight: InsertFlight): Promise<Flight> {
    const id = this.currentFlightId++;
    const flight: Flight = { ...insertFlight, id };
    this.flights.set(id, flight);
    return flight;
  }

  // Transport
  async getTransport(): Promise<Transport[]> {
    return Array.from(this.transport.values());
  }

  async getTransportById(id: number): Promise<Transport | undefined> {
    return this.transport.get(id);
  }

  async searchTransport(filters: SearchFilters): Promise<Transport[]> {
    let results = Array.from(this.transport.values());

    if (filters.vehicleType) {
      results = results.filter(transport => 
        transport.type.toLowerCase().includes(filters.vehicleType!.toLowerCase())
      );
    }

    return results;
  }

  async createTransport(insertTransport: InsertTransport): Promise<Transport> {
    const id = this.currentTransportId++;
    const transport: Transport = { ...insertTransport, id };
    this.transport.set(id, transport);
    return transport;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    const user: User = {
      ...userData,
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(userData.id, user);
    return user;
  }
}

export const storage = new MemStorage();
