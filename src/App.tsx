import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import FloatingCart from "./components/FloatingCart";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Drinks from "./pages/Drinks";
import Checkout from "./pages/Checkout";
import Reservations from "./pages/Reservations";
import Admin from "./pages/Admin";
import PaystackKeySetup from "./components/PaystackKeySetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/paystack-setup" element={<PaystackKeySetup />} />
            <Route path="/contact" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingCart />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
