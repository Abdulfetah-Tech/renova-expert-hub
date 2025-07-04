import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Hammer, 
  Paintbrush, 
  Wrench, 
  Zap, 
  Home, 
  Droplets,
  ArrowRight 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Kitchen Remodeling",
      description: "Complete kitchen renovations from design to completion",
      projects: "250+ projects",
      rating: "4.9",
      color: "text-blue-600"
    },
    {
      icon: Droplets,
      title: "Bathroom Renovation",
      description: "Modern bathroom designs with quality fixtures and finishes",
      projects: "180+ projects",
      rating: "4.8",
      color: "text-cyan-600"
    },
    {
      icon: Paintbrush,
      title: "Interior Painting",
      description: "Professional painting services for residential properties",
      projects: "420+ projects",
      rating: "4.9",
      color: "text-purple-600"
    },
    {
      icon: Hammer,
      title: "General Contracting",
      description: "Full-service construction and renovation management",
      projects: "150+ projects",
      rating: "4.7",
      color: "text-orange-600"
    },
    {
      icon: Zap,
      title: "Electrical Services",
      description: "Licensed electricians for all your electrical needs",
      projects: "320+ projects",
      rating: "4.8",
      color: "text-yellow-600"
    },
    {
      icon: Wrench,
      title: "Plumbing Services",
      description: "Expert plumbing installation, repair, and maintenance",
      projects: "290+ projects",
      rating: "4.9",
      color: "text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From minor repairs to major renovations, our verified experts handle projects of all sizes with professionalism and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-secondary ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{service.projects}</span>
                      <span className="flex items-center gap-1">
                        ⭐ {service.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Find Experts
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="accent" size="lg" className="group">
            View All Services
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;