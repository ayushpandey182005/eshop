import { Clock, Zap, Gift, Truck } from "lucide-react";

const offers = [
  {
    icon: Zap,
    title: "Flash Sale",
    description: "Up to 80% off",
    color: "text-red-500"
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹499",
    color: "text-green-500"
  },
  {
    icon: Gift,
    title: "Special Offers",
    description: "Extra 10% cashback",
    color: "text-purple-500"
  },
  {
    icon: Clock,
    title: "Limited Time",
    description: "Deal ends soon",
    color: "text-orange-500"
  }
];

const OfferBanner = () => {
  return (
    <div className="bg-gradient-primary text-white py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {offers.map((offer, index) => (
            <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
              <offer.icon className={`h-6 w-6 ${offer.color} bg-white/20 p-1 rounded`} />
              <div>
                <h4 className="font-semibold text-sm">{offer.title}</h4>
                <p className="text-xs opacity-90">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;