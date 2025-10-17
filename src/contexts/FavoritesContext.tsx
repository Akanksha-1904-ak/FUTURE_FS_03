import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface FavoriteItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev;
      }
      toast({
        title: "Added to Favorites",
        description: `${item.name} has been added to your favorites`,
      });
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from Favorites",
      description: "Item has been removed from your favorites",
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
