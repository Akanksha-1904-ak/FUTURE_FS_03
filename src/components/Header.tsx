import { useState } from "react";
import { Menu, X, Search, ShoppingBag, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import FavoritesSidebar from "./FavoritesSidebar";
import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import menRunner from "@/assets/men-runner-1.jpg";
import menTrainer from "@/assets/men-trainer-1.jpg";
import menBasketball from "@/assets/men-basketball-1.jpg";
import menMarathon from "@/assets/men-marathon-1.jpg";
import menGym from "@/assets/men-gym-1.jpg";
import menCasual from "@/assets/men-casual-1.jpg";
import menTrack from "@/assets/men-track-1.jpg";
import menLift from "@/assets/men-lift-1.jpg";
import menTennis from "@/assets/men-tennis-1.jpg";
import menSprint from "@/assets/men-sprint-1.jpg";
import menHiking from "@/assets/men-hiking-1.jpg";
import menWork from "@/assets/men-work-1.jpg";
import womenBallet from "@/assets/women-ballet-1.jpg";
import womenCardio from "@/assets/women-cardio-1.jpg";
import womenFashion from "@/assets/women-fashion-1.jpg";
import womenYoga from "@/assets/women-yoga-1.jpg";
import womenDance from "@/assets/women-dance-1.jpg";
import womenComfort from "@/assets/women-comfort-1.jpg";
import womenJog from "@/assets/women-jog-1.jpg";
import womenPilates from "@/assets/women-pilates-1.jpg";
import womenUrban from "@/assets/women-urban-1.jpg";
import womenTrail from "@/assets/women-trail-1.jpg";
import womenStudio from "@/assets/women-studio-1.jpg";
import womenWeekend from "@/assets/women-weekend-1.jpg";
import kidsSports from "@/assets/kids-sports-1.jpg";
import kidsAdventure from "@/assets/kids-adventure-1.jpg";
import kidsBasketball from "@/assets/kids-basketball-1.jpg";
import kidsPark from "@/assets/kids-park-1.jpg";
import kidsSchool from "@/assets/kids-school-1.jpg";
import kidsMultisport from "@/assets/kids-multisport-1.jpg";
import kidsPlayground from "@/assets/kids-playground-1.jpg";
import kidsSoccer from "@/assets/kids-soccer-1.jpg";
import kidsSkate from "@/assets/kids-skate-1.jpg";
import kidsPE from "@/assets/kids-pe-1.jpg";
import kidsJump from "@/assets/kids-jump-1.jpg";
import kidsNature from "@/assets/kids-nature-1.jpg";

const allProducts = [
  { id: 1, name: "NEXUS Air Max Pro", category: "Running", price: "₹15,700", image: shoe1 },
  { id: 2, name: "NEXUS Speed Elite", category: "Performance", price: "₹18,200", image: shoe2 },
  { id: 3, name: "NEXUS Court Legend", category: "Basketball", price: "₹16,500", image: shoe3 },
  { id: 4, name: "NEXUS Velocity Runner", category: "Running", price: "₹14,900", image: menRunner },
  { id: 5, name: "NEXUS Power Trainer", category: "Training", price: "₹13,200", image: menTrainer },
  { id: 6, name: "NEXUS Slam Dunk", category: "Basketball", price: "₹17,400", image: menBasketball },
  { id: 13, name: "NEXUS Ultra Marathon", category: "Long Distance", price: "₹16,500", image: menMarathon },
  { id: 14, name: "NEXUS Muscle Builder", category: "Gym", price: "₹14,000", image: menGym },
  { id: 15, name: "NEXUS Street Walker", category: "Casual", price: "₹12,400", image: menCasual },
  { id: 22, name: "NEXUS Track Star", category: "Track & Field", price: "₹15,700", image: menTrack },
  { id: 23, name: "NEXUS Iron Lift", category: "Weightlifting", price: "₹14,500", image: menLift },
  { id: 24, name: "NEXUS Court Master", category: "Tennis", price: "₹16,200", image: menTennis },
  { id: 25, name: "NEXUS Speed Demon", category: "Sprint", price: "₹15,400", image: menSprint },
  { id: 26, name: "NEXUS Mountain Grip", category: "Hiking", price: "₹16,500", image: menHiking },
  { id: 27, name: "NEXUS Business Casual", category: "Work", price: "₹13,200", image: menWork },
  { id: 7, name: "NEXUS Graceful Motion", category: "Ballet Fitness", price: "₹14,000", image: womenBallet },
  { id: 8, name: "NEXUS Cardio Queen", category: "Aerobics", price: "₹15,700", image: womenCardio },
  { id: 9, name: "NEXUS Fashion Forward", category: "Street Style", price: "₹12,400", image: womenFashion },
  { id: 16, name: "NEXUS Zen Master", category: "Yoga", price: "₹11,500", image: womenYoga },
  { id: 17, name: "NEXUS Rhythm Dancer", category: "Zumba", price: "₹13,200", image: womenDance },
  { id: 18, name: "NEXUS Premium Comfort", category: "All-Day Wear", price: "₹14,900", image: womenComfort },
  { id: 28, name: "NEXUS Jogging Bliss", category: "Light Running", price: "₹12,900", image: womenJog },
  { id: 29, name: "NEXUS Pilates Pro", category: "Pilates", price: "₹12,000", image: womenPilates },
  { id: 30, name: "NEXUS City Explorer", category: "Urban Walking", price: "₹13,700", image: womenUrban },
  { id: 31, name: "NEXUS Trail Blazer", category: "Outdoor", price: "₹14,500", image: womenTrail },
  { id: 32, name: "NEXUS Studio Flex", category: "Studio Workouts", price: "₹12,400", image: womenStudio },
  { id: 33, name: "NEXUS Weekend Vibes", category: "Leisure", price: "₹11,500", image: womenWeekend },
  { id: 10, name: "NEXUS Speedy Racer", category: "Sports Day", price: "₹7,400", image: kidsSports },
  { id: 11, name: "NEXUS Adventure Seeker", category: "Outdoor Play", price: "₹8,200", image: kidsAdventure },
  { id: 12, name: "NEXUS Hoop Dreams", category: "Basketball", price: "₹9,100", image: kidsBasketball },
  { id: 19, name: "NEXUS Park Ranger", category: "Active Play", price: "₹6,600", image: kidsPark },
  { id: 20, name: "NEXUS Classroom Cool", category: "School", price: "₹7,100", image: kidsSchool },
  { id: 21, name: "NEXUS Little Champion", category: "Multi-Sport", price: "₹7,900", image: kidsMultisport },
  { id: 34, name: "NEXUS Playground Hero", category: "Recess", price: "₹6,800", image: kidsPlayground },
  { id: 35, name: "NEXUS Soccer Star", category: "Football", price: "₹7,600", image: kidsSoccer },
  { id: 36, name: "NEXUS Skateboard Buddy", category: "Skating", price: "₹7,300", image: kidsSkate },
  { id: 37, name: "NEXUS Fun Runner", category: "PE Class", price: "₹7,200", image: kidsPE },
  { id: 38, name: "NEXUS Jump Master", category: "Jumping Games", price: "₹7,000", image: kidsJump },
  { id: 39, name: "NEXUS Mini Explorer", category: "Nature Walks", price: "₹7,500", image: kidsNature },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold tracking-tighter">
            NEXUS
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#featured" className="text-sm font-medium hover:text-accent transition-colors">
            New & Featured
          </a>
          <a href="#men" className="text-sm font-medium hover:text-accent transition-colors">
            Men
          </a>
          <a href="#women" className="text-sm font-medium hover:text-accent transition-colors">
            Women
          </a>
          <a href="#kids" className="text-sm font-medium hover:text-accent transition-colors">
            Kids
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSearchOpen(true)}
            className="hidden md:block hover:text-accent transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setFavoritesOpen(true)}
            className="relative hover:text-accent transition-colors"
          >
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-accent transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Auth buttons */}
          {user ? (
            <>
              <button 
                onClick={() => navigate("/profile")}
                className="hidden md:flex items-center gap-2 hover:text-accent transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5" />
              </button>
              <button 
                onClick={signOut}
                className="hidden md:flex items-center gap-2 hover:text-accent transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate("/auth")}
              className="hidden md:flex items-center gap-2 hover:text-accent transition-colors"
              title="Sign in"
            >
              <User className="h-5 w-5" />
            </button>
          )}
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            <a
              href="#featured"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              New & Featured
            </a>
            <a
              href="#men"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </a>
            <a
              href="#women"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </a>
            <a
              href="#kids"
              className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids
            </a>
            <div className="border-t border-border pt-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Search Dialog */}
      <SearchDialog 
        open={searchOpen} 
        onOpenChange={setSearchOpen} 
        products={allProducts}
      />
      
      {/* Favorites Sidebar */}
      <FavoritesSidebar 
        open={favoritesOpen} 
        onOpenChange={setFavoritesOpen}
      />
    </header>
  );
};

export default Header;
