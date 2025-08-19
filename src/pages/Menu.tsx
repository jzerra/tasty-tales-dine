import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import menuImages from "@/components/MenuImageEdit";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const categories = [
    { id: "all", name: "All Items" },
    { id: "dishes", name: "Dishes" },
    { id: "chewable", name: "Chewable" },
    { id: "pastries", name: "Pastries" },
    { id: "swallow", name: "Swallow" },
    { id: "drinks", name: "Drinks" },
  ];

  const menuItems = [
    // Dishes
    {
      id: 1,
      name: "Afang Soup",
      description: "Traditional Nigerian soup made with Afang leaves, meat and fish",
      price: 5000,
      category: "dishes",
      image: menuImages.afangSoup,
      rating: 4.8,
      popular: true,
    },
    {
      id: 2,
      name: "Melon/Egusi Soup",
      description: "Rich soup made with ground melon seeds and leafy vegetables",
      price: 5000,
      category: "dishes",
      image: menuImages.egusiSoup,
      rating: 4.9,
      popular: true,
    },
    {
      id: 3,
      name: "Fisherman Soup",
      description: "Fresh fish soup with native spices and vegetables",
      price: 10000,
      category: "dishes",
      image: menuImages.fisherManSoup,
      rating: 4.7,
      popular: false,
    },
    {
      id: 4,
      name: "Vegetable Soup",
      description: "Nutritious soup with assorted vegetables and meat",
      price: 5000,
      category: "dishes",
      image: menuImages.vegetableSoup,
      rating: 4.6,
      popular: false,
    },
    {
      id: 5,
      name: "Banga Soup",
      description: "Palm nut soup with traditional spices and fresh fish",
      price: 5000,
      category: "dishes",
      image: menuImages.bangaSoup,
      rating: 4.8,
      popular: true,
    },
    {
      id: 6,
      name: "White Soup",
      description: "Traditional Igbo soup with native spices and meat",
      price: 5000,
      category: "dishes",
      image: menuImages.whiteSoup,
      rating: 4.7,
      popular: false,
    },
    {
      id: 7,
      name: "Seafood Okra",
      description: "Okra soup with fresh seafood and traditional spices",
      price: 7000,
      category: "dishes",
      image: menuImages.seafoodOkra,
      rating: 4.9,
      popular: true,
    },
    {
      id: 31,
      name: "Fried Rice",
      description: "Perfectly seasoned fried rice with vegetables and protein",
      price: 5000,
      category: "dishes",
      image: menuImages.friedRice,
      rating: 4.7,
      popular: true,
    },
    {
      id: 32,
      name: "Jollof Rice",
      description: "Traditional Nigerian jollof rice with rich tomato flavor",
      price: 5000,
      category: "dishes",
      image: menuImages.jollofRice,
      rating: 4.9,
      popular: true,
    },
    // New Dishes
    {
      id: 33,
      name: "Native Soup",
      description: "Traditional native soup with local spices and ingredients",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.6,
      popular: false,
    },
    {
      id: 34,
      name: "Native Soup with Seafood",
      description: "Traditional native soup enhanced with fresh seafood",
      price: 7000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.8,
      popular: true,
    },
    {
      id: 35,
      name: "Coconut Rice",
      description: "Aromatic rice cooked in creamy coconut milk",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.7,
      popular: false,
    },
    {
      id: 36,
      name: "Native Rice",
      description: "Traditional rice dish with local spices and vegetables",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.5,
      popular: false,
    },
    {
      id: 37,
      name: "Rice and Stew",
      description: "Plain rice served with rich tomato stew",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.4,
      popular: false,
    },
    {
      id: 38,
      name: "White Rice",
      description: "Plain white rice, perfect as a side dish",
      price: 1000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.2,
      popular: false,
    },
    {
      id: 39,
      name: "Plantain Porridge",
      description: "Rich plantain porridge with vegetables and spices",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.7,
      popular: true,
    },
    {
      id: 40,
      name: "Yam Porridge",
      description: "Hearty yam porridge with vegetables and meat",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.6,
      popular: false,
    },
    {
      id: 41,
      name: "Ekpankukwu",
      description: "Traditional Nigerian delicacy with rich flavors",
      price: 5000,
      category: "dishes",
      image: "/placeholder-food.jpg",
      rating: 4.5,
      popular: false,
    },
    // Chewable
    {
      id: 8,
      name: "Goat Meat Pepper Soup",
      description: "Spicy goat meat soup with traditional pepper soup spices",
      price: 5000,
      category: "chewable",
      image: menuImages.goatMeatPepperSoup,
      rating: 4.8,
      popular: true,
    },
    {
      id: 9,
      name: "Catfish Pepper Soup",
      description: "Fresh catfish in aromatic pepper soup with local spices",
      price: 7000,
      category: "chewable",
      image: menuImages.catfishPepperSoup,
      rating: 4.9,
      popular: true,
    },
    {
      id: 11,
      name: "Peppered Snail",
      description: "Garden snails in rich tomato and pepper sauce",
      price: 6000,
      category: "chewable",
      image: menuImages.saucedSnail,
      rating: 4.7,
      popular: false,
    },
    {
      id: 12,
      name: "Isiewu",
      description: "Traditional Igbo delicacy made with goat head",
      price: 10000,
      category: "chewable",
      image: menuImages.isieEwu,
      rating: 4.8,
      popular: true,
    },
    {
      id: 13,
      name: "Nkwobi",
      description: "Spicy cow foot delicacy with potash and spices",
      price: 10000,
      category: "chewable",
      image: menuImages.nkwobi,
      rating: 4.7,
      popular: false,
    },
    // New Chewable Items
    {
      id: 42,
      name: "Chicken and Chips",
      description: "Crispy fried chicken served with golden chips",
      price: 7000,
      category: "chewable",
      image: "/placeholder-food.jpg",
      rating: 4.8,
      popular: true,
    },
    {
      id: 43,
      name: "Goat Meat and Chips",
      description: "Tender goat meat served with crispy chips",
      price: 6000,
      category: "chewable",
      image: "/placeholder-food.jpg",
      rating: 4.6,
      popular: false,
    },
    {
      id: 44,
      name: "Chicken Pepper Soup",
      description: "Spicy chicken soup with aromatic pepper soup spices",
      price: 5000,
      category: "chewable",
      image: "/placeholder-food.jpg",
      rating: 4.7,
      popular: false,
    },
    {
      id: 45,
      name: "Pepper Soup",
      description: "Traditional spicy pepper soup with assorted meat",
      price: 4000,
      category: "chewable",
      image: "/placeholder-food.jpg",
      rating: 4.5,
      popular: false,
    },
    {
      id: 46,
      name: "Cowleg Special",
      description: "Tender cow leg prepared with special spices",
      price: 6000,
      category: "chewable",
      image: "/placeholder-food.jpg",
      rating: 4.6,
      popular: false,
    },
    // Coming Soon Items (no price)
    {
      id: 14,
      name: "Grilled Chicken",
      description: "Perfectly grilled chicken with local spices",
      price: null,
      category: "chewable",
      image: menuImages.grilledChicken,
      rating: 4.8,
      popular: true,
      comingSoon: true,
    },
    {
      id: 15,
      name: "Grilled Fish",
      description: "Fresh grilled fish with traditional seasonings",
      price: null,
      category: "chewable",
      image: menuImages.grilledFish,
      rating: 4.9,
      popular: true,
      comingSoon: true,
    },
    {
      id: 16,
      name: "Bole",
      description: "Traditional roasted plantain with groundnut",
      price: null,
      category: "chewable",
      image: menuImages.bolle,
      rating: 4.5,
      popular: false,
      comingSoon: true,
    },
    // Pastries
    {
      id: 17,
      name: "Meat Pie",
      description: "Flaky pastry filled with seasoned minced meat",
      price: 1000,
      category: "pastries",
      image: menuImages.meatPie,
      rating: 4.7,
      popular: true,
    },
    {
      id: 18,
      name: "Chin Chin",
      description: "Crunchy sweet fried pastry cubes (Big: ₦1,800, Small: ₦800)",
      price: 1800,
      category: "pastries",
      image: menuImages.chinChin,
      rating: 4.6,
      popular: false,
    },
    {
      id: 20,
      name: "Egg Roll",
      description: "Crispy pastry filled with hard-boiled egg and spices",
      price: 800,
      category: "pastries",
      image: menuImages.eggRoll,
      rating: 4.7,
      popular: false,
    },
    {
      id: 22,
      name: "Doughnut",
      description: "Sweet glazed doughnuts, freshly made",
      price: 500,
      category: "pastries",
      image: menuImages.doughnuts,
      rating: 4.6,
      popular: true,
    },
    {
      id: 23,
      name: "Fish Pie",
      description: "Flaky pastry filled with seasoned fish",
      price: 1000,
      category: "pastries",
      image: menuImages.fishPie,
      rating: 4.8,
      popular: false,
    },
    {
      id: 25,
      name: "Puff Puff",
      description: "Sweet deep-fried dough balls",
      price: 300,
      category: "pastries",
      image: menuImages.puffPuff,
      rating: 4.9,
      popular: true,
    },
    // New Pastries
    {
      id: 47,
      name: "Chicken Pie",
      description: "Flaky pastry filled with seasoned chicken",
      price: 1000,
      category: "pastries",
      image: "/placeholder-food.jpg",
      rating: 4.7,
      popular: false,
    },
    {
      id: 48,
      name: "Ug's Special Jumbo Roll",
      description: "Our signature jumbo roll with special filling",
      price: 1200,
      category: "pastries",
      image: "/placeholder-food.jpg",
      rating: 4.8,
      popular: true,
    },
    // Swallow (New Category)
    {
      id: 49,
      name: "Poundo",
      description: "Smooth pounded yam flour swallow",
      price: 1000,
      category: "swallow",
      image: "/placeholder-food.jpg",
      rating: 4.5,
      popular: false,
    },
    {
      id: 50,
      name: "Fufu",
      description: "Traditional cassava flour swallow",
      price: 1000,
      category: "swallow",
      image: "/placeholder-food.jpg",
      rating: 4.4,
      popular: false,
    },
    {
      id: 51,
      name: "Garri",
      description: "Cassava flakes swallow, locally processed",
      price: 1000,
      category: "swallow",
      image: "/placeholder-food.jpg",
      rating: 4.3,
      popular: false,
    },
    {
      id: 52,
      name: "Semovita",
      description: "Wheat-based swallow, smooth and satisfying",
      price: 1000,
      category: "swallow",
      image: "/placeholder-food.jpg",
      rating: 4.4,
      popular: false,
    },
    // Drinks
    {
      id: 53,
      name: "Water",
      description: "Pure bottled water",
      price: 500,
      category: "drinks",
      image: "/placeholder-drink.jpg",
      rating: 4.0,
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
                  {item.comingSoon ? (
                    <span className="text-2xl font-bold text-muted-foreground">Coming Soon</span>
                  ) : (
                    <span className="text-2xl font-bold text-primary">₦{item.price.toLocaleString()}</span>
                  )}
                  {!item.comingSoon && (
                    <Button 
                      variant="hero" 
                      size="sm" 
                      className="group-hover:scale-110 transition-transform"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Drinks Section */}
        <div className="text-center mt-12 mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-3">Looking for Drinks?</h3>
            <p className="text-muted-foreground mb-4">
              Check out our extensive drinks menu with premium whisky, wines, spirits & more.
            </p>
            <Link to="/drinks">
              <Button variant="default" size="lg">
                View Drinks Menu
              </Button>
            </Link>
          </div>
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