import { useState, useEffect } from "react";
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
  MapPin,
  Loader2,
  LogOut
} from "lucide-react";
import { supabase, Order, Reservation } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import AdminAuth from "@/components/AdminAuth";

const Admin = () => {
  const [orders, setOrders] = useState<(Order & { items: string[] })[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_name,
            quantity
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const formattedOrders = ordersData?.map(order => ({
        ...order,
        order_status: order.order_status as Order['order_status'],
        items: order.order_items?.map((item: any) => 
          `${item.product_name} (${item.quantity})`
        ) || []
      })) || [];

      setOrders(formattedOrders as (Order & { items: string[] })[]);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    }
  };

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true })
        .order('reservation_time', { ascending: true });

      if (error) throw error;
      setReservations((data || []).map(res => ({
        ...res,
        status: res.status as Reservation['status']
      })) as Reservation[]);
    } catch (error: any) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Error",
        description: "Failed to load reservations",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchReservations()]);
      setLoading(false);
    };

    loadData();

    // Set up real-time subscriptions
    const ordersSubscription = supabase
      .channel('orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => fetchOrders()
      )
      .subscribe();

    const reservationsSubscription = supabase
      .channel('reservations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'reservations' },
        () => fetchReservations()
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
      reservationsSubscription.unsubscribe();
    };
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, order_status: newStatus as Order['order_status'] } : order
      ));

      toast({
        title: "Order updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const updateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId);

      if (error) throw error;

      setReservations(reservations.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status: newStatus as Reservation['status'] } : reservation
      ));

      toast({
        title: "Reservation updated",
        description: `Reservation status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update reservation status",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
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
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter(order => order.order_status === "pending").length;
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(res => res.status === "confirmed").length;

  if (loading) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AdminAuth>
    );
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold mb-2">Restaurant Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage orders, reservations, and track performance</p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
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
                <div className="text-2xl font-bold">₦{orders.length > 0 ? (totalRevenue / orders.length).toLocaleString() : '0'}</div>
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
                              <h3 className="font-semibold">{order.id.slice(0, 8)}...</h3>
                              <Badge variant={getStatusBadgeVariant(order.order_status)} className="flex items-center gap-1">
                                {getStatusIcon(order.order_status)}
                                {order.order_status}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                {order.order_type === "delivery" ? <Truck className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                                {order.order_type}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{order.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                            {order.delivery_address && (
                              <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">₦{order.total.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Items:</p>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                        </div>

                        {order.order_status !== "completed" && (
                          <div className="flex gap-2">
                            {order.order_status === "pending" && (
                              <Button 
                                size="sm" 
                                variant="warm"
                                onClick={() => updateOrderStatus(order.id, "preparing")}
                              >
                                Start Preparing
                              </Button>
                            )}
                            {order.order_status === "preparing" && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, "ready")}
                              >
                                Mark Ready
                              </Button>
                            )}
                            {order.order_status === "ready" && (
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
                            <p className="text-sm font-medium">{reservation.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{reservation.customer_phone}</p>
                            {reservation.occasion && reservation.occasion !== "Regular Dining" && (
                              <p className="text-sm text-accent">Special Occasion: {reservation.occasion}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{new Date(reservation.reservation_date).toLocaleDateString()}</p>
                            <p className="text-sm font-medium">{reservation.reservation_time}</p>
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
    </AdminAuth>
  );
};

export default Admin;