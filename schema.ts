import { pgTable, text, serial, integer, boolean, timestamp, decimal, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  imageUrl: text("image_url").notNull(),
  amenities: text("amenities").array().notNull(),
  featured: boolean("featured").default(false),
});

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  airline: text("airline").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  fromCode: text("from_code").notNull(),
  toCode: text("to_code").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  frequency: text("frequency").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  flightType: text("flight_type").notNull().default("domestic"), // 'domestic' or 'international'
  returnPrice: decimal("return_price", { precision: 10, scale: 2 }),
  returnDuration: text("return_duration"),
  returnDepartureTime: text("return_departure_time"),
  returnArrivalTime: text("return_arrival_time"),
  country: text("country").notNull().default("Zimbabwe"),
  timezone: text("timezone").notNull().default("Africa/Harare"),
});

export const transport = pgTable("transport", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  imageUrl: text("image_url").notNull(),
  features: text("features").array().notNull(),
  capacity: integer("capacity").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'hotel', 'flight', 'transport'
  itemId: integer("item_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  guests: integer("guests"),
  passengers: integer("passengers"),
  pickupLocation: text("pickup_location"),
  dropoffLocation: text("dropoff_location"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

export const insertFlightSchema = createInsertSchema(flights).omit({
  id: true,
});

export const insertTransportSchema = createInsertSchema(transport).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type Hotel = typeof hotels.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type Transport = typeof transport.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;

export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertTransport = z.infer<typeof insertTransportSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export interface SearchFilters {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
  passengers?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  vehicleType?: string;
  flightType?: "domestic" | "international";
  tripType?: "one-way" | "round-trip";
}
