import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users, Phone, Mail } from "lucide-react";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    specialRequests: "",
  });

  const timeSlots = [
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
  ];

  const occasions = [
    "Regular Dining", "Birthday", "Anniversary", "Business Meeting", 
    "Date Night", "Family Gathering", "Special Celebration"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Reservation submitted:", formData);
    alert("Reservation request submitted! We'll confirm your booking within 24 hours.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Make a Reservation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reserve your table at Bella Vista and enjoy an unforgettable dining experience
              with our exquisite cuisine and warm hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Details</CardTitle>
                  <CardDescription>
                    Fill out the form below to make your reservation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Reservation Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Reservation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Time *</Label>
                          <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="guests">Number of Guests *</Label>
                          <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "Guest" : "Guests"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="occasion">Occasion</Label>
                        <Select value={formData.occasion} onValueChange={(value) => handleInputChange("occasion", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occasion (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {occasions.map((occasion) => (
                              <SelectItem key={occasion} value={occasion}>
                                {occasion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea
                          id="requests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                          placeholder="Dietary restrictions, seating preferences, celebration details, etc."
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Make Reservation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Restaurant Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">Mon-Thu: 5:00 PM - 10:00 PM</p>
                      <p className="text-sm text-muted-foreground">Fri-Sat: 5:00 PM - 11:00 PM</p>
                      <p className="text-sm text-muted-foreground">Sun: 4:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">reservations@bellavista.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reservation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>• Reservations are confirmed within 24 hours</p>
                  <p>• Please arrive within 15 minutes of your reservation time</p>
                  <p>• Cancellations must be made at least 2 hours in advance</p>
                  <p>• Large parties (8+) may require a deposit</p>
                  <p>• Special dietary requirements can be accommodated with advance notice</p>
                </CardContent>
              </Card>

              {/* Contact for Large Groups */}
              <Card className="bg-gradient-warm">
                <CardHeader>
                  <CardTitle>Large Groups & Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Planning a special event or need to accommodate more than 8 guests?
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Events Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;