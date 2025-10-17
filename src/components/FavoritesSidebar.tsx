import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { X } from "lucide-react";

interface FavoritesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FavoritesSidebar = ({ open, onOpenChange }: FavoritesSidebarProps) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>My Favorites ({favorites.length})</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Your favorites list is empty</p>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-border pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="font-bold">{item.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            addToCart(item);
                            removeFromFavorites(item.id);
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromFavorites(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FavoritesSidebar;
