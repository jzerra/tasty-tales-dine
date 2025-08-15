import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import afangSoupImg from "@/assets/afang-soup.jpg";
import egusiSoupImg from "@/assets/egusi-soup.jpg";
import pepperSoupImg from "@/assets/pepper-soup.jpg";
import meatPieImg from "@/assets/meat-pie.jpg";
import grilledCatfishImg from "@/assets/grilled-catfish.jpg";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items" },
    { id: "dishes", name: "Dishes" },
    { id: "chewable", name: "Chewable" },
    { id: "pastries", name: "Pastries" },
    { id: "wines", name: "Wines & Spirits" },
  ];

  const menuItems = [
    // Dishes
    {
      id: 1,
      name: "Afang Soup",
      description: "Traditional Nigerian soup made with Afang leaves, meat and fish",
      price: 10000,
      category: "dishes",
      image: afangSoupImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 2,
      name: "Melon/Egusi Soup",
      description: "Rich soup made with ground melon seeds and leafy vegetables",
      price: 10000,
      category: "dishes",
      image: egusiSoupImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 3,
      name: "Fisherman Soup",
      description: "Fresh fish soup with native spices and vegetables",
      price: 10000,
      category: "dishes",
      image: afangSoupImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 4,
      name: "Vegetable Soup",
      description: "Nutritious soup with assorted vegetables and meat",
      price: 10000,
      category: "dishes",
      image: egusiSoupImg,
      rating: 4.6,
      popular: false,
    },
    {
      id: 5,
      name: "Banga Soup",
      description: "Palm nut soup with traditional spices and fresh fish",
      price: 10000,
      category: "dishes",
      image: afangSoupImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 6,
      name: "White Soup",
      description: "Traditional Igbo soup with native spices and meat",
      price: 10000,
      category: "dishes",
      image: egusiSoupImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 7,
      name: "Seafood Okra",
      description: "Okra soup with fresh seafood and traditional spices",
      price: 10000,
      category: "dishes",
      image: afangSoupImg,
      rating: 4.9,
      popular: true,
    },
    // Chewable
    {
      id: 8,
      name: "Goat Meat Pepper Soup",
      description: "Spicy goat meat soup with traditional pepper soup spices",
      price: 8000,
      category: "chewable",
      image: pepperSoupImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 9,
      name: "Catfish Pepper Soup",
      description: "Fresh catfish in aromatic pepper soup with local spices",
      price: 7500,
      category: "chewable",
      image: grilledCatfishImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 10,
      name: "Peppered Kpomo",
      description: "Spicy cow skin delicacy with peppers and onions",
      price: 5000,
      category: "chewable",
      image: pepperSoupImg,
      rating: 4.6,
      popular: false,
    },
    {
      id: 11,
      name: "Sauced Snail",
      description: "Garden snails in rich tomato and pepper sauce",
      price: 6500,
      category: "chewable",
      image: pepperSoupImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 12,
      name: "Isie Ewu",
      description: "Traditional Igbo delicacy made with goat head",
      price: 12000,
      category: "chewable",
      image: pepperSoupImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 13,
      name: "Nkwobi",
      description: "Spicy cow foot delicacy with potash and spices",
      price: 8500,
      category: "chewable",
      image: pepperSoupImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 14,
      name: "Grilled Chicken",
      description: "Perfectly grilled chicken with local spices",
      price: 9000,
      category: "chewable",
      image: grilledCatfishImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 15,
      name: "Grilled Fish",
      description: "Fresh grilled fish with traditional seasonings",
      price: 8000,
      category: "chewable",
      image: grilledCatfishImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 16,
      name: "Bolle",
      description: "Traditional roasted plantain with groundnut",
      price: 3500,
      category: "chewable",
      image: grilledCatfishImg,
      rating: 4.5,
      popular: false,
    },
    // Pastries
    {
      id: 17,
      name: "Meat Pie",
      description: "Flaky pastry filled with seasoned minced meat",
      price: 2000,
      category: "pastries",
      image: meatPieImg,
      rating: 4.7,
      popular: true,
    },
    {
      id: 18,
      name: "Chin Chin",
      description: "Crunchy sweet fried pastry cubes",
      price: 1500,
      category: "pastries",
      image: meatPieImg,
      rating: 4.6,
      popular: false,
    },
    {
      id: 19,
      name: "Samosa",
      description: "Crispy triangular pastry with spiced filling",
      price: 1800,
      category: "pastries",
      image: meatPieImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 20,
      name: "Egg Roll",
      description: "Crispy pastry filled with hard-boiled egg and spices",
      price: 2200,
      category: "pastries",
      image: meatPieImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 21,
      name: "Pan Cake",
      description: "Fluffy pancakes served with syrup",
      price: 2500,
      category: "pastries",
      image: meatPieImg,
      rating: 4.5,
      popular: false,
    },
    {
      id: 22,
      name: "Doughnuts",
      description: "Sweet glazed doughnuts, freshly made",
      price: 1800,
      category: "pastries",
      image: meatPieImg,
      rating: 4.6,
      popular: true,
    },
    {
      id: 23,
      name: "Fish Pie",
      description: "Flaky pastry filled with seasoned fish",
      price: 2200,
      category: "pastries",
      image: meatPieImg,
      rating: 4.8,
      popular: false,
    },
    {
      id: 24,
      name: "Spring Rolls",
      description: "Crispy rolls with vegetable and meat filling",
      price: 2000,
      category: "pastries",
      image: meatPieImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 25,
      name: "Puff Puff",
      description: "Sweet deep-fried dough balls",
      price: 1500,
      category: "pastries",
      image: meatPieImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 26,
      name: "Cup Cake",
      description: "Moist cupcakes with creamy frosting",
      price: 2000,
      category: "pastries",
      image: meatPieImg,
      rating: 4.6,
      popular: false,
    },
    // Wines & Spirits
    {
      id: 27,
      name: "Red Wine",
      description: "Premium red wine selection",
      price: 15000,
      category: "wines",
      image: meatPieImg,
      rating: 4.8,
      popular: true,
    },
    {
      id: 28,
      name: "White Wine",
      description: "Crisp and refreshing white wine",
      price: 14000,
      category: "wines",
      image: meatPieImg,
      rating: 4.7,
      popular: false,
    },
    {
      id: 29,
      name: "Whiskey",
      description: "Premium whiskey selection",
      price: 25000,
      category: "wines",
      image: meatPieImg,
      rating: 4.9,
      popular: true,
    },
    {
      id: 30,
      name: "Vodka",
      description: "Premium vodka brands available",
      price: 20000,
      category: "wines",
      image: meatPieImg,
      rating: 4.6,
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
                  <span className="text-2xl font-bold text-primary">₦{item.price.toLocaleString()}</span>
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