import { Link } from "wouter";
import { MapPin, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="bg-booking-dark text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="text-booking-gold text-2xl" />
            <div>
              <h1 className="text-2xl font-bold font-inter">Dande</h1>
              <span className="text-sm text-gray-300">Zimbabwe Travel</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/hotels" className="hover:text-booking-gold transition-colors">
              Hotels
            </Link>
            <Link href="/flights" className="hover:text-booking-gold transition-colors">
              Flights
            </Link>
            <Link href="/transport" className="hover:text-booking-gold transition-colors">
              Transport
            </Link>
            <Link href="/support" className="hover:text-booking-gold transition-colors">
              Support
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/search">
              <Button variant="outline" className="hidden md:flex">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-booking-primary hover:bg-booking-secondary transition-colors">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-booking-dark text-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/hotels" className="hover:text-booking-gold transition-colors">
                    Hotels
                  </Link>
                  <Link href="/flights" className="hover:text-booking-gold transition-colors">
                    Flights
                  </Link>
                  <Link href="/transport" className="hover:text-booking-gold transition-colors">
                    Transport
                  </Link>
                  <Link href="/support" className="hover:text-booking-gold transition-colors">
                    Support
                  </Link>
                  <Link href="/auth" className="hover:text-booking-gold transition-colors">
                    Sign In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
