import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

const SearchDialog = ({ open, onOpenChange, products }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="overflow-y-auto flex-1 space-y-2">
          {searchQuery && filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No products found
            </p>
          )}
          {searchQuery &&
            filteredProducts.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="font-bold mt-1">{product.price}</p>
                  </div>
                  <Button
                    variant="hero"
                    onClick={() => {
                      addToCart(product);
                      onOpenChange(false);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
