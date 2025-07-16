import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "wouter";
import type { Hotel } from "@shared/schema";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{hotel.name}</h3>
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(hotel.rating))
                      ? "fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-booking-primary">
              ${hotel.price}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <Link href={`/booking/hotel/${hotel.id}`}>
            <Button className="bg-booking-primary hover:bg-booking-secondary text-white">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
