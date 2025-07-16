import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Transport } from "@shared/schema";

interface TransportCardProps {
  transport: Transport;
}

export default function TransportCard({ transport }: TransportCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={transport.imageUrl}
        alt={transport.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{transport.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{transport.description}</p>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Features:</p>
          <div className="flex flex-wrap gap-2">
            {transport.features.map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-booking-primary">
              ${transport.price}
            </span>
            <span className="text-gray-500 text-sm">/hour</span>
          </div>
          <Link href={`/booking/transport/${transport.id}`}>
            <Button className="bg-booking-primary hover:bg-booking-secondary text-white">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
