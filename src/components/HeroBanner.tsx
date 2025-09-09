import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import electronicsBanner from "@/assets/electronics-banner.jpg";
import fashionBanner from "@/assets/fashion-banner.jpg";

const banners = [
  {
    id: 1,
    image: heroBanner1,
    title: "Mega Sale",
    subtitle: "Up to 80% off on all categories",
    cta: "Shop Now",
    link: "/category/deals"
  },
  {
    id: 2,
    image: electronicsBanner,
    title: "Electronics Fest",
    subtitle: "Latest gadgets at best prices",
    cta: "Explore",
    link: "/category/electronics"
  },
  {
    id: 3,
    image: fashionBanner,
    title: "Fashion Week",
    subtitle: "Trending styles for everyone",
    cta: "Discover",
    link: "/category/fashion"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg mx-4 mb-8">
      {/* Banner images */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-2xl px-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8">
                  {banner.subtitle}
                </p>
                <Button 
                  variant="cart" 
                  size="lg" 
                  className="text-lg px-8 py-3"
                  onClick={() => navigate(banner.link)}
                >
                  {banner.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;