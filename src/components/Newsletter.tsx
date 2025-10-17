import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-orange))]/20 to-[hsl(var(--brand-red))]/20" />
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              Join the Movement
            </h2>
            <p className="text-lg text-primary-foreground/80 md:text-xl">
              Be the first to know about new releases, exclusive offers, and athlete stories. Subscribe to our newsletter today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button type="submit" variant="energy" size="lg">
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-primary-foreground/60">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
