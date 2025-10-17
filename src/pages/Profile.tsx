import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Loader2, Package, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  total: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  product_category: string;
  quantity: number;
  price: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      if (ordersData) {
        // Fetch order items for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from("order_items")
              .select("*")
              .eq("order_id", order.id);

            if (itemsError) throw itemsError;

            return {
              ...order,
              order_items: itemsData || [],
            };
          })
        );

        setOrders(ordersWithItems);
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to load order history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order History
              </CardTitle>
              <CardDescription>
                View all your past orders and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/")}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <div key={order.id}>
                      {index > 0 && <Separator className="my-6" />}
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {order.status}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_address}, {order.shipping_city}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_state} - {order.shipping_zip}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium">Items</p>
                          {order.order_items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.product_category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ₹{item.price.toFixed(2)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
