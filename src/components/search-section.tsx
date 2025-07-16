import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Plane, Car, Search } from "lucide-react";
import { useLocation } from "wouter";

type SearchTab = "hotels" | "flights" | "transport";

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState<SearchTab>("hotels");
  const [, setLocation] = useLocation();

  const handleSearch = (type: SearchTab) => {
    setLocation(`/${type}`);
  };

  return (
    <section className="bg-white shadow-lg -mt-24 relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Search Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeTab === "hotels" ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === "hotels"
                  ? "bg-booking-primary text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("hotels")}
            >
              <Bed className="mr-2 h-4 w-4" />
              Hotels
            </Button>
            <Button
              variant={activeTab === "flights" ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === "flights"
                  ? "bg-booking-primary text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("flights")}
            >
              <Plane className="mr-2 h-4 w-4" />
              Flights
            </Button>
            <Button
              variant={activeTab === "transport" ? "default" : "ghost"}
              className={`flex-1 ${
                activeTab === "transport"
                  ? "bg-booking-primary text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("transport")}
            >
              <Car className="mr-2 h-4 w-4" />
              Transport
            </Button>
          </div>

          {/* Hotel Search Form */}
          {activeTab === "hotels" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="destination">Where are you going?</Label>
                <Input
                  id="destination"
                  placeholder="Harare, Victoria Falls, Bulawayo..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="checkin">Check-in</Label>
                <Input id="checkin" type="date" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out</Label>
                <Input id="checkout" type="date" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="guests">Guests</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="1 adult" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 adult</SelectItem>
                    <SelectItem value="2">2 adults</SelectItem>
                    <SelectItem value="2+1">2 adults, 1 child</SelectItem>
                    <SelectItem value="3">3 adults</SelectItem>
                    <SelectItem value="4">4 adults</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Flight Search Form */}
          {activeTab === "flights" && (
            <div className="space-y-4">
              <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-booking-primary text-white hover:bg-booking-secondary"
                >
                  Domestic
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-transparent text-gray-600 hover:bg-gray-200"
                >
                  International
                </Button>
              </div>
              
              <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-booking-primary text-white hover:bg-booking-secondary"
                >
                  One Way
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-transparent text-gray-600 hover:bg-gray-200"
                >
                  Round Trip
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Harare (HRE)"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Victoria Falls (VFA)"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="departure">Departure</Label>
                  <Input id="departure" type="date" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="return">Return</Label>
                  <Input id="return" type="date" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="1 passenger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 passenger</SelectItem>
                      <SelectItem value="2">2 passengers</SelectItem>
                      <SelectItem value="3">3 passengers</SelectItem>
                      <SelectItem value="4">4 passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Transport Search Form */}
          {activeTab === "transport" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="pickup">Pick-up Location</Label>
                <Input
                  id="pickup"
                  placeholder="Harare Airport, Hotel..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <Input
                  id="dropoff"
                  placeholder="Victoria Falls, Bulawayo..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="datetime">Date & Time</Label>
                <Input id="datetime" type="datetime-local" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="vehicle">Vehicle Type</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy Car</SelectItem>
                    <SelectItem value="luxury">Luxury Sedan</SelectItem>
                    <SelectItem value="suv">VIP SUV</SelectItem>
                    <SelectItem value="van">Executive Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              className="w-full md:w-auto bg-booking-primary hover:bg-booking-secondary text-white px-8 py-3"
              onClick={() => handleSearch(activeTab)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search {activeTab === "hotels" ? "Hotels" : activeTab === "flights" ? "Flights" : "Transport"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
