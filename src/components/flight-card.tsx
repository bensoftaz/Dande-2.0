import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { Link } from "wouter";
import type { Flight } from "@shared/schema";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold">{flight.fromCode}</p>
              <p className="text-sm text-gray-600">{flight.from}</p>
            </div>
            <div className="flex-1 relative">
              <div className="border-t border-gray-300 relative">
                <Plane className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-booking-primary w-4 h-4" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{flight.toCode}</p>
              <p className="text-sm text-gray-600">{flight.to}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-booking-primary">
              ${flight.price}
            </p>
            <p className="text-sm text-gray-600">one way</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{flight.duration}</span>
          <span>{flight.airline}</span>
          <span>{flight.frequency}</span>
        </div>
        <Link href={`/booking/flight/${flight.id}`}>
          <Button className="w-full bg-booking-primary hover:bg-booking-secondary text-white">
            Book Flight
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
