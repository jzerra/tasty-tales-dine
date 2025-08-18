import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Drinks", path: "/drinks" },
    { name: "Reservations", path: "/reservations" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/f9c980d7-6af4-44cc-a86c-ecd1f7cc4926.png" 
              alt="Ug's Winery Lounge & Restaurant Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground hidden sm:block">Ug's Winery Lounge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CartDrawer>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="ml-2">Cart ({state.itemCount})</span>
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </CartDrawer>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              <span className="ml-2">Login</span>
            </Button>
            <Link to="/admin">
              <Button variant="warm" size="sm">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <CartDrawer>
                  <Button variant="ghost" size="sm" className="justify-start relative">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="ml-2">Cart ({state.itemCount})</span>
                    {state.itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {state.itemCount}
                      </span>
                    )}
                  </Button>
                </CartDrawer>
                <Button variant="outline" size="sm" className="justify-start">
                  <User className="h-4 w-4" />
                  <span className="ml-2">Login</span>
                </Button>
                <Link to="/admin">
                  <Button variant="warm" size="sm" className="w-full justify-start">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;