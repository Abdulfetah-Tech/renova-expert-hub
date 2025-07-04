import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-renovation.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional home renovation" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connect with
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Trusted </span>
              Home Renovation Experts
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Find verified professionals for all your home renovation and maintenance needs. 
              Get quotes, compare experts, and transform your space with confidence.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Insured & Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Quality Guaranteed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group">
              Find Experts Near You
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Join as Expert
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Verified Experts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Right Column - Feature Cards */}
        <div className="space-y-6 lg:pl-8">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-border/50">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Quick & Easy Process</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                <span className="text-muted-foreground">Describe your project</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                <span className="text-muted-foreground">Get matched with experts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
                <span className="text-muted-foreground">Compare quotes & hire</span>
              </div>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-border/50">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Popular Services</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg text-center">Kitchen Remodel</div>
              <div className="text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg text-center">Bathroom</div>
              <div className="text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg text-center">Flooring</div>
              <div className="text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg text-center">Plumbing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;