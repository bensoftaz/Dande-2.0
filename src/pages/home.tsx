import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SearchSection from "@/components/search-section";
import HotelCard from "@/components/hotel-card";
import FlightCard from "@/components/flight-card";
import TransportCard from "@/components/transport-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Headphones, Star } from "lucide-react";
import { Link } from "wouter";
import type { Hotel, Flight, Transport } from "@shared/schema";

export default function Home() {
  const { data: featuredHotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels/featured"],
  });

  const { data: flights } = useQuery<Flight[]>({
    queryKey: ["/api/flights"],
  });

  const { data: transport } = useQuery<Transport[]>({
    queryKey: ["/api/transport"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <SearchSection />

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-inter text-center mb-12">
            Popular Zimbabwe Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Victoria Falls"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Victoria Falls</h3>
                <p className="text-sm">From $120/night</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Harare city"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Harare</h3>
                <p className="text-sm">From $80/night</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1571297280100-b13683075c5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Bulawayo city"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Bulawayo</h3>
                <p className="text-sm">From $60/night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-inter text-center mb-12">
            Featured Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels?.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* VIP Transport Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-inter text-center mb-12">
            VIP Transport Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transport?.map((item) => (
              <TransportCard key={item.id} transport={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Flight Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-inter text-center mb-12">
            Popular Flight Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flights?.slice(0, 2).map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4">
              Why Choose Dande?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for all travel needs in Zimbabwe
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-booking-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                SSL encrypted transactions and secure payment processing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-booking-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer service and assistance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-booking-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Rates</h3>
              <p className="text-gray-600">
                Competitive pricing and exclusive deals for Zimbabwe travel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-booking-navy">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold font-inter mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Get the latest deals and travel tips for Zimbabwe
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-r-none"
                />
                <Button className="bg-booking-blue hover:bg-blue-600 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
