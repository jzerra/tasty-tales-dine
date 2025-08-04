import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import salmonImg from "@/assets/salmon.jpg";
import pastaImg from "@/assets/pasta.jpg";
import steakImg from "@/assets/steak.jpg";
import saladImg from "@/assets/salad.jpg";
import dessertImg from "@/assets/dessert.jpg";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "mains", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Grilled Atlantic Salmon",
      description: "Fresh salmon with roasted vegetables and herb butter",
      price: 28.99,
      category: "mains",
      image: salmonImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 2,
      name: "Truffle Pasta Carbonara",
      description: "House-made pasta with crispy pancetta and truffle oil",
      price: 24.99,
      category: "mains",
      image: pastaImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 3,
      name: "Beef Tenderloin",
      description: "Premium cut with roasted potatoes and seasonal vegetables",
      price: 45.99,
      category: "mains",
      image: steakImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 4,
      name: "Mediterranean Salad",
      description: "Mixed greens, feta cheese, olives, and balsamic vinaigrette",
      price: 16.99,
      category: "appetizers",
      image: saladImg,
      rating: 4.6,
      popular: false,
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream and berry compote",
      price: 12.99,
      category: "desserts",
      image: dessertImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 6,
      name: "Bruschetta Trio",
      description: "Three varieties with tomato, mushroom, and ricotta toppings",
      price: 14.99,
      category: "appetizers",
      image: saladImg,
      rating: 4.5,
      popular: false,
    },
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
            and traditional techniques passed down through generations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {item.popular && (
                  <Badge className="absolute top-3 left-3 bg-gold text-gold-foreground">
                    Popular
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {item.name}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                  <Button variant="hero" size="sm" className="group-hover:scale-110 transition-transform">
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-warm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
            <p className="text-muted-foreground mb-6">
              Browse our full menu and place your order for delivery or pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Order for Delivery
              </Button>
              <Button variant="outline" size="lg">
                Order for Pickup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;