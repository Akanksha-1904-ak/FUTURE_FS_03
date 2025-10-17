import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-athlete.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Athlete in motion"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-center px-4 md:px-6">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
              RUN YOUR
              <br />
              <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--brand-red))] bg-clip-text text-transparent">
                WORLD
              </span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
              Experience the next generation of performance footwear. Engineered for athletes who refuse to settle.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#featured">
              <Button variant="energy" size="xl">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#featured">
              <Button variant="hero" size="xl">
                Explore Collection
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
