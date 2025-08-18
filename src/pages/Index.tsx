import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Phone, Mail, Utensils, Heart, Award, Wine, ChefHat, Sparkles } from "lucide-react";
import heroImage from "@/assets/nigerian-restaurant-hero.jpg";
import afangSoupImg from "@/assets/afang-soup.jpg";
import melonSoupImg from "@/assets/melon-soup.jpg";
import hennesyImg from "@/assets/hennessy-cognac.jpg";
import iseEwuImg from "@/assets/ise-ewu.jpg";
import jollofRiceImg from "@/assets/jollof-rice.jpg";
import friedRiceImg from "@/assets/fried-rice.jpg";
import egusiSoupImg from "@/assets/egusi-soup.jpg";
import meatPieImg from "@/assets/meat-pie.jpg";
import pepperSoupImg from "@/assets/pepper-soup.jpg";

const Index = () => {
  const featuredDishes = [
    {
      name: "Melon Soup",
      description: "Traditional Nigerian melon soup with rich vegetables and tender meat",
      price: 12000,
      image: melonSoupImg,
      rating: 4.8,
      category: "Signature"
    },
    {
      name: "Hennessy VS",
      description: "Premium cognac with smooth finish, perfect for special occasions",
      price: 55000,
      image: hennesyImg,
      rating: 4.9,
      category: "Premium Drinks"
    },
    {
      name: "Ise Ewu",
      description: "Traditional spicy goat head delicacy with aromatic herbs and spices",
      price: 15000,
      image: iseEwuImg,
      rating: 4.7,
      category: "Signature"
    },
    {
      name: "Afang Soup",
      description: "Rich traditional soup with Afang leaves, stockfish, and assorted meat",
      price: 10000,
      image: afangSoupImg,
      rating: 4.8,
      category: "Signature"
    },
    {
      name: "Jollof Rice",
      description: "Signature Nigerian rice dish with vibrant flavors and perfect spice blend",
      price: 8000,
      image: jollofRiceImg,
      rating: 4.9,
      category: "Rice Dishes"
    },
    {
      name: "Fried Rice",
      description: "Colorful fried rice with mixed vegetables and aromatic seasonings",
      price: 7500,
      image: friedRiceImg,
      rating: 4.6,
      category: "Rice Dishes"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/f9c980d7-6af4-44cc-a86c-ecd1f7cc4926.png" 
              alt="Ug's Winery Lounge & Restaurant Logo" 
              className="w-32 h-32 mx-auto mb-6 object-contain filter brightness-110"
            />
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-gold"></div>
              <Sparkles className="h-4 w-4 text-gold" />
              <div className="h-px w-12 bg-gold"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="block mb-2">Ug's Winery Lounge</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-gold via-warm to-gold bg-clip-text text-transparent font-medium">
              & Restaurant
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/90">
            Where Nigerian culinary artistry meets premium wine culture. Experience the finest 
            traditional dishes paired with exceptional wines in Lagos's most elegant dining destination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/menu">
              <Button variant="hero" size="xl" className="min-w-[220px] font-semibold">
                <Utensils className="h-5 w-5" />
                Explore Our Menu
              </Button>
            </Link>
            <Link to="/reservations">
              <Button 
                variant="outline" 
                size="xl" 
                className="min-w-[220px] bg-white/10 border-2 border-gold/50 text-white hover:bg-gold/20 hover:border-gold transition-all duration-300 font-semibold backdrop-blur-sm"
              >
                Reserve Your Table
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us - Split Screen */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <ChefHat className="h-6 w-6" />
                <span className="text-sm uppercase tracking-wide font-semibold">Our Story</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Authentic Nigerian Flavors with a 
                <span className="text-primary"> Modern Touch</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a passion for preserving Nigerian culinary traditions, Ug's Winery Lounge 
                represents the perfect marriage of authentic flavors and contemporary dining. Our master 
                chef brings over two decades of expertise, sourcing the finest ingredients from across 
                Nigeria to create dishes that honor our heritage.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Combined with our carefully curated wine selection featuring both international and 
                African wines, we offer a dining experience that celebrates the richness of Nigerian 
                culture in an atmosphere of refined elegance.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Premium Wines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Signature Dishes</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={friedRiceImg}
                  alt="Chef preparing traditional Nigerian cuisine"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-gold to-warm rounded-full flex items-center justify-center shadow-xl">
                <Award className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu - Split Screen Reverse */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="lg:order-2 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Utensils className="h-6 w-6" />
                <span className="text-sm uppercase tracking-wide font-semibold">Signature Menu</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Taste the 
                <span className="text-primary"> Essence of Nigeria</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our hearty traditional soups to delicate pastries and expertly prepared chewables, 
                every dish tells a story of Nigerian culinary excellence. Each recipe has been perfected 
                through generations, using authentic spices and cooking techniques.
              </p>
              
              <div className="space-y-4">
                {featuredDishes.map((dish, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 group">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{dish.name}</h4>
                        <span className="font-bold text-primary">₦{dish.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/menu">
                <Button variant="default" size="lg" className="mt-6">
                  View Complete Menu
                  <Utensils className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img src={afangSoupImg} alt="Afang Soup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={jollofRiceImg} alt="Jollof Rice" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={iseEwuImg} alt="Ise Ewu" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img src={melonSoupImg} alt="Melon Soup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <Sparkles className="h-4 w-4 text-primary" />
              <div className="h-px w-12 bg-primary"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">The Ug's Experience</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every visit to Ug's is more than a meal—it's a celebration of Nigerian culture, 
              premium hospitality, and culinary excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group border-0 shadow-elegant hover:shadow-warm transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Master Chef Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our executive chef, trained in both traditional Nigerian cooking and international 
                  culinary arts, ensures every dish meets the highest standards of authenticity and taste.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group border-0 shadow-elegant hover:shadow-warm transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-warm to-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wine className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Premium Wine Curation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our sommelier has carefully selected wines from renowned vineyards worldwide, 
                  including exclusive African wines that perfectly complement our Nigerian dishes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group border-0 shadow-elegant hover:shadow-warm transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Elegant Atmosphere</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our thoughtfully designed space blends contemporary elegance with warm Nigerian 
                  hospitality, creating the perfect ambiance for any occasion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Hours - Split Screen */}
      <section className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm uppercase tracking-wide font-semibold">Visit Us</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Experience Lagos's Finest Nigerian Dining</h2>
                <p className="text-lg text-muted-foreground">
                  Located in the heart of Victoria Island, we're easily accessible and ready to welcome 
                  you to an unforgettable culinary journey.
                </p>
              </div>
              
              <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-muted-foreground">123 Wellington Bassey Avenue<br />Uyo, Akwa Ibom State</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Reservations</h4>
                        <p className="text-muted-foreground">+234 801 234 5678</p>
                        <p className="text-sm text-muted-foreground mt-1">Call daily 11:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">reservations@ugswinery.com</p>
                        <p className="text-sm text-muted-foreground mt-1">We respond within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Clock className="h-6 w-6 text-primary" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-primary/5">
                      <div>
                        <div className="font-semibold">Monday - Thursday</div>
                        <div className="text-sm text-muted-foreground">Lunch & Dinner Service</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">12:00 PM - 11:00 PM</div>
                        <div className="text-sm text-gold">Kitchen closes 10:30 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-xl bg-warm/10">
                      <div>
                        <div className="font-semibold">Friday - Saturday</div>
                        <div className="text-sm text-muted-foreground">Extended Weekend Hours</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">12:00 PM - 12:00 AM</div>
                        <div className="text-sm text-warm">Full menu until 11:30 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-xl bg-gold/10">
                      <div>
                        <div className="font-semibold">Sunday</div>
                        <div className="text-sm text-muted-foreground">Sunday Special Hours</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">2:00 PM - 11:00 PM</div>
                        <div className="text-sm text-gold">Brunch available 2-5 PM</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <Link to="/reservations">
                        <Button variant="default" size="lg" className="w-full">
                          Make a Reservation
                          <Phone className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                    <p className="text-sm text-center text-muted-foreground mt-3">
                      Reservations recommended, especially for weekend dining
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
