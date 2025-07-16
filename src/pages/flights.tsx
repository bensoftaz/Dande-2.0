import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import FlightCard from "@/components/flight-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Flight, SearchFilters } from "@shared/schema";

export default function Flights() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [flightType, setFlightType] = useState<"domestic" | "international">("domestic");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  const { data: flights, isLoading } = useQuery<Flight[]>({
    queryKey: ["/api/flights"],
  });

  const { data: searchResults } = useQuery<Flight[]>({
    queryKey: ["/api/flights/search", searchFilters],
    queryFn: async () => {
      if (!searchFilters.from && !searchFilters.to && !isSearching) return [];
      const response = await apiRequest("POST", "/api/flights/search", searchFilters);
      return response.json();
    },
    enabled: isSearching,
  });

  const handleSearch = () => {
    setSearchFilters({
      ...searchFilters,
      flightType,
      tripType
    });
    setIsSearching(true);
  };

  const displayFlights = searchResults && searchResults.length > 0 ? searchResults : flights;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-inter mb-8">Flights in Zimbabwe</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Flight Type Selection */}
          <div className="mb-6">
            <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFlightType("domestic")}
                className={`${
                  flightType === "domestic"
                    ? "bg-booking-primary text-white hover:bg-booking-secondary"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                Domestic
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFlightType("international")}
                className={`${
                  flightType === "international"
                    ? "bg-booking-primary text-white hover:bg-booking-secondary"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                International
              </Button>
            </div>
            
            <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTripType("one-way")}
                className={`${
                  tripType === "one-way"
                    ? "bg-booking-primary text-white hover:bg-booking-secondary"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                One Way
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTripType("round-trip")}
                className={`${
                  tripType === "round-trip"
                    ? "bg-booking-primary text-white hover:bg-booking-secondary"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                Round Trip
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder={flightType === "domestic" ? "Harare (HRE)" : "Harare (HRE)"}
                value={searchFilters.from || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, from: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder={flightType === "domestic" ? "Victoria Falls (VFA)" : "London (LHR)"}
                value={searchFilters.to || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, to: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="date">Departure Date</Label>
              <Input
                id="date"
                type="date"
                value={searchFilters.date || ""}
                onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                className="mt-2"
              />
            </div>
            {tripType === "round-trip" && (
              <div>
                <Label htmlFor="returnDate">Return Date</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={searchFilters.returnDate || ""}
                  onChange={(e) => setSearchFilters({ ...searchFilters, returnDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            )}
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select
                value={searchFilters.passengers?.toString() || "1"}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, passengers: parseInt(value) })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="1 passenger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 passenger</SelectItem>
                  <SelectItem value="2">2 passengers</SelectItem>
                  <SelectItem value="3">3 passengers</SelectItem>
                  <SelectItem value="4">4 passengers</SelectItem>
                  <SelectItem value="5">5 passengers</SelectItem>
                  <SelectItem value="6">6 passengers</SelectItem>
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
              Search Flights
            </Button>
          </div>
        </div>

        {/* Flights Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {displayFlights && displayFlights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No flights found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
