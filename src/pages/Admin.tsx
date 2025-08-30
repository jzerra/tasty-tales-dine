import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  LogOut,
  Plus,
  Edit,
  Trash2,
  UtensilsCrossed
} from "lucide-react";
import { supabase, Order, Reservation } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import AdminAuth from "@/components/AdminAuth";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
}

const Admin = () => {
  const [orders, setOrders] = useState<(Order & { items: string[] })[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuFormOpen, setMenuFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    is_available: true
  });
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

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchReservations(), fetchMenuItems()]);
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

    const menuSubscription = supabase
      .channel('menu_items')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'menu_items' },
        () => fetchMenuItems()
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
      reservationsSubscription.unsubscribe();
      menuSubscription.unsubscribe();
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

  const handleMenuFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const menuData = {
        name: menuFormData.name,
        description: menuFormData.description,
        price: parseFloat(menuFormData.price),
        category: menuFormData.category,
        image_url: menuFormData.image_url,
        is_available: menuFormData.is_available
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(menuData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Menu item updated",
          description: "Menu item has been successfully updated",
        });
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([menuData]);

        if (error) throw error;

        toast({
          title: "Menu item added",
          description: "New menu item has been successfully added",
        });
      }

      setMenuFormOpen(false);
      setEditingItem(null);
      setMenuFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        is_available: true
      });
      fetchMenuItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: editingItem ? "Failed to update menu item" : "Failed to add menu item",
        variant: "destructive"
      });
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setMenuFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url,
      is_available: item.is_available
    });
    setMenuFormOpen(true);
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Menu item deleted",
        description: "Menu item has been successfully deleted",
      });
      fetchMenuItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete menu item",
        variant: "destructive"
      });
    }
  };

  const toggleMenuItemAvailability = async (itemId: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !isAvailable })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Menu item updated",
        description: `Menu item is now ${!isAvailable ? 'available' : 'unavailable'}`,
      });
      fetchMenuItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update menu item",
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
            <TabsList className="grid w-full lg:w-600 grid-cols-3">
              <TabsTrigger value="orders">Orders Management</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
              <TabsTrigger value="menu">Menu Management</TabsTrigger>
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

            {/* Menu Management Tab */}
            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Menu Management</CardTitle>
                      <CardDescription>Add, edit, and manage menu items</CardDescription>
                    </div>
                    <Dialog open={menuFormOpen} onOpenChange={setMenuFormOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => {
                          setEditingItem(null);
                          setMenuFormData({
                            name: '',
                            description: '',
                            price: '',
                            category: '',
                            image_url: '',
                            is_available: true
                          });
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Menu Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <form onSubmit={handleMenuFormSubmit}>
                          <DialogHeader>
                            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                            <DialogDescription>
                              {editingItem ? 'Update the menu item details below.' : 'Fill in the details for the new menu item.'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Name</Label>
                              <Input
                                id="name"
                                value={menuFormData.name}
                                onChange={(e) => setMenuFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="price" className="text-right">Price</Label>
                              <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={menuFormData.price}
                                onChange={(e) => setMenuFormData(prev => ({ ...prev, price: e.target.value }))}
                                className="col-span-3"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="category" className="text-right">Category</Label>
                              <Select
                                value={menuFormData.category}
                                onValueChange={(value) => setMenuFormData(prev => ({ ...prev, category: value }))}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="appetizers">Appetizers</SelectItem>
                                  <SelectItem value="main-course">Main Course</SelectItem>
                                  <SelectItem value="sides">Sides</SelectItem>
                                  <SelectItem value="desserts">Desserts</SelectItem>
                                  <SelectItem value="beverages">Beverages</SelectItem>
                                  <SelectItem value="special">Special</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="image_url" className="text-right">Image URL</Label>
                              <Input
                                id="image_url"
                                value={menuFormData.image_url}
                                onChange={(e) => setMenuFormData(prev => ({ ...prev, image_url: e.target.value }))}
                                className="col-span-3"
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                              <Label htmlFor="description" className="text-right">Description</Label>
                              <Textarea
                                id="description"
                                value={menuFormData.description}
                                onChange={(e) => setMenuFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="col-span-3"
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">{editingItem ? 'Update' : 'Add'} Menu Item</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            {item.image_url && (
                              <img 
                                src={item.image_url} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant={item.is_available ? "default" : "secondary"}>
                                  {item.is_available ? "Available" : "Unavailable"}
                                </Badge>
                                <Badge variant="outline">{item.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                              <p className="text-lg font-bold text-primary">₦{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleMenuItemAvailability(item.id, item.is_available)}
                            >
                              <UtensilsCrossed className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditMenuItem(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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