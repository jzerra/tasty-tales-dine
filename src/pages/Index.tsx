import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Phone, Mail, Utensils, Heart, Award } from "lucide-react";
import heroImage from "@/assets/restaurant-hero.jpg";
import salmonImg from "@/assets/salmon.jpg";
import pastaImg from "@/assets/pasta.jpg";
import steakImg from "@/assets/steak.jpg";

const Index = () => {
  const featuredDishes = [
    {
      name: "Grilled Atlantic Salmon",
      description: "Fresh salmon with roasted vegetables",
      price: 28.99,
      image: salmonImg,
      rating: 4.8,
    },
    {
      name: "Truffle Pasta Carbonara",
      description: "House-made pasta with truffle oil",
      price: 24.99,
      image: pastaImg,
      rating: 4.9,
    },
    {
      name: "Beef Tenderloin",
      description: "Premium cut with seasonal vegetables",
      price: 45.99,
      image: steakImg,
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-gold to-warm bg-clip-text text-transparent">
              Bella Vista
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience exceptional cuisine crafted with passion, served in an atmosphere 
            that celebrates the art of fine dining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                <Utensils className="h-5 w-5" />
                View Our Menu
              </Button>
            </Link>
            <Link to="/reservations">
              <Button variant="outline" size="xl" className="min-w-[200px] bg-white/10 border-white/20 text-white hover:bg-white/20">
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our chef's signature creations, prepared with the finest ingredients
              and traditional techniques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredDishes.map((dish, index) => (
              <Card key={index} className="group hover:shadow-warm transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span className="text-xs font-medium">{dish.rating}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {dish.name}
                  </CardTitle>
                  <CardDescription>{dish.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${dish.price}</span>
                    <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20">
                      Chef's Choice
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="default" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Bella Vista</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing an exceptional dining experience that goes beyond just great food.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-none shadow-elegant">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Award-Winning Chef</h3>
                <p className="text-muted-foreground">
                  Our head chef brings 20+ years of culinary excellence and international recognition.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-elegant">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-warm to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
                <p className="text-muted-foreground">
                  We source only the finest, locally-grown ingredients to ensure every dish exceeds expectations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-elegant">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
                <p className="text-muted-foreground">
                  Our dedicated team ensures every guest receives personalized attention and care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>4:00 PM - 9:00 PM</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">123 Gourmet Street, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@bellavista.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
