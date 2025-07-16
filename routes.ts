import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, type SearchFilters } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Hotels
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/featured", async (req, res) => {
    try {
      const hotels = await storage.getFeaturedHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });

  app.post("/api/hotels/search", async (req, res) => {
    try {
      const filters: SearchFilters = req.body;
      const hotels = await storage.searchHotels(filters);
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to search hotels" });
    }
  });

  // Flights
  app.get("/api/flights", async (req, res) => {
    try {
      const flights = await storage.getFlights();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flights" });
    }
  });

  app.get("/api/flights/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const flight = await storage.getFlight(id);
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flight" });
    }
  });

  app.post("/api/flights/search", async (req, res) => {
    try {
      const filters: SearchFilters = req.body;
      const flights = await storage.searchFlights(filters);
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: "Failed to search flights" });
    }
  });

  // Transport
  app.get("/api/transport", async (req, res) => {
    try {
      const transport = await storage.getTransport();
      res.json(transport);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transport" });
    }
  });

  app.get("/api/transport/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const transport = await storage.getTransportById(id);
      if (!transport) {
        return res.status(404).json({ message: "Transport not found" });
      }
      res.json(transport);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transport" });
    }
  });

  app.post("/api/transport/search", async (req, res) => {
    try {
      const filters: SearchFilters = req.body;
      const transport = await storage.searchTransport(filters);
      res.json(transport);
    } catch (error) {
      res.status(500).json({ message: "Failed to search transport" });
    }
  });

  // Bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  // Authentication routes
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Demo user with hashed password
      const demoUser = {
        id: "1",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        // This is bcrypt hash of "password123"
        passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
      };
      
      if (email === demoUser.email) {
        // Compare password with hash
        const isValid = await bcrypt.compare(password, demoUser.passwordHash);
        if (isValid) {
          res.json({ 
            success: true, 
            user: { 
              id: demoUser.id, 
              email: demoUser.email, 
              firstName: demoUser.firstName, 
              lastName: demoUser.lastName 
            } 
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ message: "Sign in failed" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, password } = req.body;
      
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Hash password before saving
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      // In a real application, you would save to database
      // For now, we'll simulate a successful registration
      console.log("New user registered:", { firstName, lastName, email, phone, passwordHash });
      
      res.json({ 
        success: true, 
        message: "Account created successfully" 
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Sign up failed" });
    }
  });

  // Support contact form
  app.post("/api/support/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // In a real application, you would send an email or save to database
      // For now, we'll simulate a successful contact form submission
      if (name && email && subject && message) {
        console.log("Support message received:", { name, email, subject, message });
        res.json({ 
          success: true, 
          message: "Message sent successfully" 
        });
      } else {
        res.status(400).json({ message: "Missing required fields" });
      }
    } catch (error) {
      console.error("Error sending support message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Unified search endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const { query, category, location, filters } = req.body;
      
      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
      }

      const searchQuery = query.toLowerCase();
      let results = [];

      // Search hotels
      if (!category || category === "hotels") {
        const hotels = await storage.getHotels();
        const hotelMatches = hotels.filter(hotel => 
          hotel.name.toLowerCase().includes(searchQuery) ||
          hotel.location.toLowerCase().includes(searchQuery) ||
          hotel.city.toLowerCase().includes(searchQuery) ||
          hotel.description.toLowerCase().includes(searchQuery)
        );
        results.push(...hotelMatches.map(item => ({ ...item, category: "hotels" })));
      }

      // Search flights
      if (!category || category === "flights") {
        const flights = await storage.getFlights();
        const flightMatches = flights.filter(flight => 
          flight.airline.toLowerCase().includes(searchQuery) ||
          flight.from.toLowerCase().includes(searchQuery) ||
          flight.to.toLowerCase().includes(searchQuery) ||
          flight.fromCode.toLowerCase().includes(searchQuery) ||
          flight.toCode.toLowerCase().includes(searchQuery)
        );
        results.push(...flightMatches.map(item => ({ ...item, category: "flights" })));
      }

      // Search transport
      if (!category || category === "transport") {
        const transport = await storage.getTransport();
        const transportMatches = transport.filter(item => 
          item.name.toLowerCase().includes(searchQuery) ||
          item.type.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.features.some(feature => feature.toLowerCase().includes(searchQuery))
        );
        results.push(...transportMatches.map(item => ({ ...item, category: "transport" })));
      }

      // Apply location filter if provided
      if (location) {
        results = results.filter(item => {
          if (item.category === "hotels") {
            return item.location.toLowerCase().includes(location.toLowerCase()) ||
                   item.city.toLowerCase().includes(location.toLowerCase());
          }
          if (item.category === "flights") {
            return item.from.toLowerCase().includes(location.toLowerCase()) ||
                   item.to.toLowerCase().includes(location.toLowerCase());
          }
          return true;
        });
      }

      // Apply additional filters
      if (filters) {
        if (filters.priceRange) {
          results = results.filter(item => {
            const price = parseInt(item.price) || 0;
            return price >= filters.priceRange.min && price <= filters.priceRange.max;
          });
        }
        
        if (filters.capacity) {
          results = results.filter(item => {
            return item.capacity >= filters.capacity;
          });
        }
      }

      res.json({
        success: true,
        results: results.slice(0, 20), // Limit to 20 results
        total: results.length,
        query: query,
        category: category || "all"
      });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
