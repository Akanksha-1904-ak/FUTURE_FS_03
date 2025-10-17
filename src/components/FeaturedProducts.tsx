import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";

const products = [
  {
    id: 1,
    name: "NEXUS Air Max Pro",
    category: "Running",
    price: "₹15,700",
    image: shoe1,
  },
  {
    id: 2,
    name: "NEXUS Speed Elite",
    category: "Performance",
    price: "₹18,200",
    image: shoe2,
  },
  {
    id: 3,
    name: "NEXUS Court Legend",
    category: "Basketball",
    price: "₹16,500",
    image: shoe3,
  },
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  return (
    <section id="featured" className="py-20 md:py-32 scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
            Featured Collection
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Discover our most innovative designs, crafted for peak performance and style
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => {
                    if (isFavorite(product.id)) {
                      removeFromFavorites(product.id);
                    } else {
                      addToFavorites(product);
                    }
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-accent text-accent' : ''}`}
                  />
                </button>
              </div>
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent">{product.category}</p>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-2xl font-bold">{product.price}</p>
                </div>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
