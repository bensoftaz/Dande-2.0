import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HotelCard from "@/components/hotel-card";
import FlightCard from "@/components/flight-card";
import TransportCard from "@/components/transport-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, Calendar, Users } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Hotel, Flight, Transport } from "@shared/schema";

interface SearchResult {
  hotels: Hotel[];
  flights: Flight[];
  transport: Transport[];
  total: number;
  query: string;
  category: string;
}

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [capacity, setCapacity] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Get URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    const categoryParam = urlParams.get("category");
    const locationParam = urlParams.get("location");
    
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setCategory(categoryParam);
    if (locationParam) setLocationFilter(locationParam);
    
    // Trigger search if we have parameters
    if (queryParam || categoryParam || locationParam) {
      setIsSearching(true);
    }
  }, []);

  const { data: searchResults, isLoading, error } = useQuery<SearchResult>({
    queryKey: ["/api/search", searchQuery, category, location, priceRange, capacity],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/search", {
        query: searchQuery,
        category: category === "all" ? null : category,
        location: location || null,
        filters: {
          priceRange: priceRange.min > 0 || priceRange.max < 1000 ? priceRange : null,
          capacity: capacity > 1 ? capacity : null
        }
      });
      return response.json();
    },
    enabled: isSearching && searchQuery.trim() !== "",
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    // Update URL
    const params = new URLSearchParams();
    params.set("query", searchQuery);
    if (category !== "all") params.set("category", category);
    if (location) params.set("location", location);
    
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCategory("all");
    setLocationFilter("");
    setPriceRange({ min: 0, max: 1000 });
    setCapacity(1);
    setIsSearching(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter mb-4">Search Zimbabwe Travel Services</h1>
          <p className="text-gray-600">Find hotels, flights, and transport services across Zimbabwe</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search-query">Search Query</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search-query"
                    placeholder="Hotels, flights, transport..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="hotels">Hotels</SelectItem>
                    <SelectItem value="flights">Flights</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Harare, Victoria Falls..."
                    value={location}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <div className="relative mt-2">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="20"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleSearch}
                className="bg-booking-primary hover:bg-booking-secondary text-white"
                disabled={!searchQuery.trim()}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button
                onClick={clearSearch}
                variant="outline"
                disabled={!isSearching}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching && (
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-booking-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Searching...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">Error occurred while searching. Please try again.</p>
              </div>
            ) : searchResults ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Search Results for "{searchResults.query}"
                  </h2>
                  <p className="text-gray-600">
                    Found {searchResults.total} results
                    {searchResults.category !== "all" && ` in ${searchResults.category}`}
                  </p>
                </div>

                {/* Hotels Results */}
                {searchResults.hotels && searchResults.hotels.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Hotels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Flights Results */}
                {searchResults.flights && searchResults.flights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Flights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.flights.map((flight) => (
                        <FlightCard key={flight.id} flight={flight} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Transport Results */}
                {searchResults.transport && searchResults.transport.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Transport</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.transport.map((transport) => (
                        <TransportCard key={transport.id} transport={transport} />
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {searchResults.total === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No results found for "{searchResults.query}". Try adjusting your search terms.
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Default Content */}
        {!isSearching && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Discover Zimbabwe</h2>
            <p className="text-gray-600 mb-6">
              Search for hotels, flights, and transport services across Zimbabwe
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setLocation("/hotels")}
                variant="outline"
              >
                Browse Hotels
              </Button>
              <Button
                onClick={() => setLocation("/flights")}
                variant="outline"
              >
                Browse Flights
              </Button>
              <Button
                onClick={() => setLocation("/transport")}
                variant="outline"
              >
                Browse Transport
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}