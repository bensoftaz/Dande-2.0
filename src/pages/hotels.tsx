import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import HotelCard from "@/components/hotel-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Hotel, SearchFilters } from "@shared/schema";

export default function Hotels() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const { data: searchResults } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels/search", searchFilters],
    queryFn: async () => {
      if (!searchFilters.destination && !isSearching) return [];
      const response = await apiRequest("POST", "/api/hotels/search", searchFilters);
      return response.json();
    },
    enabled: isSearching,
  });

  const handleSearch = () => {
    setIsSearching(true);
  };

  const displayHotels = searchResults && searchResults.length > 0 ? searchResults : hotels;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-inter mb-8">Hotels in Zimbabwe</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="City or location"
                value={searchFilters.destination || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="checkin">Check-in Date</Label>
              <Input
                id="checkin"
                type="date"
                value={searchFilters.checkIn || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, checkIn: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="checkout">Check-out Date</Label>
              <Input
                id="checkout"
                type="date"
                value={searchFilters.checkOut || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, checkOut: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={searchFilters.guests || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, guests: parseInt(e.target.value) || undefined })}
                className="mt-2"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={handleSearch}
              className="bg-booking-blue hover:bg-blue-600 text-white px-8 py-3"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </div>
        </div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {displayHotels && displayHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
