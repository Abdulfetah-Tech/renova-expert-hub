import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, CheckCircle, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Describe Your Project",
      description: "Tell us about your renovation needs, timeline, and budget. Our smart matching system will understand your requirements.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Get Matched & Compare",
      description: "Receive quotes from verified experts in your area. Compare profiles, reviews, portfolios, and pricing all in one place.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      step: "03",
      icon: CheckCircle,
      title: "Hire with Confidence",
      description: "Choose your preferred expert, schedule the work, and track progress. All experts are insured and background-checked.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      step: "04",
      icon: Star,
      title: "Rate & Review",
      description: "After completion, rate your experience to help other homeowners make informed decisions for their projects.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your renovation project completed in 4 simple steps. From initial consultation to project completion, we're with you every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border transform translate-x-4 translate-y-2" />
              )}
              
              <Card className="text-center hover:shadow-soft transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-4`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Verified Experts</h3>
            <p className="text-muted-foreground text-sm">
              All professionals are background-checked, licensed, and insured for your peace of mind.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quality Guarantee</h3>
            <p className="text-muted-foreground text-sm">
              We stand behind every project with our satisfaction guarantee and dispute resolution system.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
            <p className="text-muted-foreground text-sm">
              Our customer support team is available around the clock to help with any questions.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl" className="group">
            Start Your Project Today
            <CheckCircle className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;