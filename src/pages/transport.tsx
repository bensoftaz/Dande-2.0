import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import TransportCard from "@/components/transport-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Transport, SearchFilters } from "@shared/schema";

export default function TransportPage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);

  const { data: transport, isLoading } = useQuery<Transport[]>({
    queryKey: ["/api/transport"],
  });

  const { data: searchResults } = useQuery<Transport[]>({
    queryKey: ["/api/transport/search", searchFilters],
    queryFn: async () => {
      if (!searchFilters.vehicleType && !isSearching) return [];
      const response = await apiRequest("POST", "/api/transport/search", searchFilters);
      return response.json();
    },
    enabled: isSearching,
  });

  const handleSearch = () => {
    setIsSearching(true);
  };

  const displayTransport = searchResults && searchResults.length > 0 ? searchResults : transport;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-inter mb-8">VIP Transport Services</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="pickup">Pick-up Location</Label>
              <Input
                id="pickup"
                placeholder="Airport, hotel, address..."
                value={searchFilters.pickupLocation || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, pickupLocation: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="dropoff">Drop-off Location</Label>
              <Input
                id="dropoff"
                placeholder="Destination address..."
                value={searchFilters.dropoffLocation || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, dropoffLocation: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="datetime">Date & Time</Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={searchFilters.date || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="vehicle">Vehicle Type</Label>
              <Select
                value={searchFilters.vehicleType || ""}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, vehicleType: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="sedan">Luxury Sedan</SelectItem>
                  <SelectItem value="suv">VIP SUV</SelectItem>
                  <SelectItem value="van">Executive Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={handleSearch}
              className="bg-booking-primary hover:bg-booking-secondary text-white px-8 py-3"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Transport
            </Button>
          </div>
        </div>

        {/* Transport Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
            {displayTransport && displayTransport.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTransport.map((item) => (
                  <TransportCard key={item.id} transport={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No transport services found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
