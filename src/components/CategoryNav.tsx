import { Smartphone, Laptop, Shirt, Home, Gamepad2, Camera, Watch, Car } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: Smartphone, color: "text-blue-600" },
  { name: "Fashion", icon: Shirt, color: "text-pink-600" },
  { name: "Home & Garden", icon: Home, color: "text-green-600" },
  { name: "Sports", icon: Gamepad2, color: "text-orange-600" },
  { name: "Beauty", icon: Camera, color: "text-purple-600" },
  { name: "Watches", icon: Watch, color: "text-yellow-600" },
  { name: "Automotive", icon: Car, color: "text-red-600" },
  { name: "Laptops", icon: Laptop, color: "text-indigo-600" },
];

const CategoryNav = () => {
  return (
    <div className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-flipkart-gray group-hover:bg-primary/10 transition-colors">
                <category.icon className={`h-6 w-6 ${category.color} group-hover:text-primary`} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;