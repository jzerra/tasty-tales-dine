import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  ShoppingBag, 
  Calendar, 
  DollarSign, 
  Users,
  Truck,
  MapPin
} from "lucide-react";

const Admin = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      items: ["Grilled Salmon", "Pasta Carbonara"],
      total: 53.98,
      status: "pending",
      type: "delivery",
      time: "2024-01-15 18:30",
      phone: "(555) 123-4567",
      address: "123 Main St, New York, NY"
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: ["Beef Tenderloin", "Chocolate Cake"],
      total: 58.98,
      status: "preparing",
      type: "pickup",
      time: "2024-01-15 19:00",
      phone: "(555) 987-6543",
      address: null
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      items: ["Mediterranean Salad", "Bruschetta"],
      total: 31.98,
      status: "completed",
      type: "delivery",
      time: "2024-01-15 17:45",
      phone: "(555) 456-7890",
      address: "456 Oak Ave, New York, NY"
    },
  ]);

  const [reservations, setReservations] = useState([
    {
      id: "RES-001",
      customer: "Alice Wilson",
      date: "2024-01-16",
      time: "7:00 PM",
      guests: 4,
      phone: "(555) 111-2222",
      occasion: "Anniversary",
      status: "confirmed"
    },
    {
      id: "RES-002",
      customer: "Mike Davis",
      date: "2024-01-16",
      time: "7:30 PM",
      guests: 2,
      phone: "(555) 333-4444",
      occasion: "Date Night",
      status: "pending"
    },
    {
      id: "RES-003",
      customer: "Sarah Brown",
      date: "2024-01-17",
      time: "6:00 PM",
      guests: 6,
      phone: "(555) 555-6666",
      occasion: "Birthday",
      status: "confirmed"
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateReservationStatus = (reservationId: string, newStatus: string) => {
    setReservations(reservations.map(reservation => 
      reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
    ));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending": return "outline";
      case "preparing": return "secondary";
      case "completed": return "default";
      case "confirmed": return "default";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "preparing": return <ShoppingBag className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(res => res.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Restaurant Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage orders, reservations, and track performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Need immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReservations}</div>
                <p className="text-xs text-muted-foreground">{confirmedReservations} confirmed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalRevenue / orders.length).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+5.2% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full lg:w-400 grid-cols-2">
              <TabsTrigger value="orders">Orders Management</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage and track customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{order.id}</h3>
                              <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                {order.type === "delivery" ? <Truck className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                                {order.type}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.phone}</p>
                            {order.address && (
                              <p className="text-sm text-muted-foreground">{order.address}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">{order.time}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Items:</p>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                        </div>

                        {order.status !== "completed" && (
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <Button 
                                size="sm" 
                                variant="warm"
                                onClick={() => updateOrderStatus(order.id, "preparing")}
                              >
                                Start Preparing
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => updateOrderStatus(order.id, "completed")}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reservations Tab */}
            <TabsContent value="reservations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Reservations</CardTitle>
                  <CardDescription>Manage table reservations and confirmations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{reservation.id}</h3>
                              <Badge variant={getStatusBadgeVariant(reservation.status)} className="flex items-center gap-1">
                                {getStatusIcon(reservation.status)}
                                {reservation.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{reservation.customer}</p>
                            <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                            {reservation.occasion !== "Regular Dining" && (
                              <p className="text-sm text-accent">Special Occasion: {reservation.occasion}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{reservation.date}</p>
                            <p className="text-sm font-medium">{reservation.time}</p>
                            <p className="text-sm text-muted-foreground">{reservation.guests} guests</p>
                          </div>
                        </div>

                        {reservation.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                            >
                              Confirm Reservation
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;