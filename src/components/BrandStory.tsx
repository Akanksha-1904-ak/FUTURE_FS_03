import { Zap, Shield, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "Cutting-edge technology that pushes the boundaries of performance",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Premium materials and construction that withstand the toughest conditions",
  },
  {
    icon: Target,
    title: "Athlete Tested",
    description: "Designed and refined with input from world-class athletes",
  },
];

const BrandStory = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                Engineered for
                <br />
                <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--brand-red))] bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                For over three decades, we've been at the forefront of athletic innovation. Our commitment to excellence drives us to create footwear that doesn't just meet expectations—it exceeds them.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Every product we create is the result of countless hours of research, testing, and refinement. We work directly with athletes to understand their needs and translate those insights into groundbreaking designs.
              </p>
              <p className="text-muted-foreground">
                From the track to the street, our shoes are built to perform. Because we believe that everyone is an athlete, and everyone deserves the best.
              </p>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group flex gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--brand-orange))] to-[hsl(var(--brand-red))] transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
