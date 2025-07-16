import { useState, useEffect } from "react";

const zimbabweImages = [
  {
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Victoria Falls",
    description: "The magnificent Victoria Falls, one of the Seven Natural Wonders of the World"
  },
  {
    url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Matobo Hills",
    description: "Mystical granite formations and ancient San rock art in Zimbabwe"
  },
  {
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Harare City Center",
    description: "Zimbabwe's capital with modern buildings and vibrant urban life"
  },
  {
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Hwange National Park",
    description: "Africa's wildlife paradise with elephants, lions, and diverse ecosystems"
  },
  {
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Great Zimbabwe Ruins",
    description: "Ancient stone city showcasing Zimbabwe's rich cultural heritage"
  },
  {
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85",
    title: "Lake Kariba",
    description: "Africa's largest artificial lake with stunning sunsets and fishing"
  }
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === zimbabweImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentImage = zimbabweImages[currentImageIndex];

  return (
    <section className="relative bg-booking-dark">
      <div className="absolute inset-0 bg-gradient-to-r from-booking-dark/80 to-booking-primary/60"></div>
      <div
        className="relative bg-cover bg-center h-96 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${currentImage.url}')`,
        }}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          loading="eager"
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        />
        <div className="absolute inset-0 bg-booking-dark/70"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold font-inter mb-4">
              Discover Zimbabwe
            </h2>
            <p className="text-xl mb-4 max-w-2xl mx-auto">
              Book hotels, flights, and VIP transport for your perfect Zimbabwe
              adventure
            </p>
            <p className="text-sm text-booking-gold mb-8">
              {currentImage.title} - {currentImage.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {zimbabweImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-booking-gold"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
