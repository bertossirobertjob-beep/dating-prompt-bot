import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "/mese",
    description: "Perfetto per iniziare",
    features: [
      "3 analisi al mese",
      "Frasi d'apertura base",
      "Supporto email"
    ],
    popular: false
  },
  {
    name: "Pro", 
    price: "€9.99",
    period: "/mese",
    description: "Per chi vuole risultati seri",
    features: [
      "50 analisi al mese",
      "Analytics avanzate", 
      "Suggerimenti multipli",
      "Supporto prioritario",
      "Templates personalizzati"
    ],
    popular: true
  },
  {
    name: "Expert",
    price: "€19.99", 
    period: "/mese",
    description: "Per i professionisti del dating",
    features: [
      "Analisi illimitate",
      "Coaching personalizzato",
      "API access",
      "Consulenza 1-on-1",
      "Analytics in tempo reale",
      "A/B testing messaggi"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Scegli il Tuo <span className="gradient-text">Piano</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Inizia gratis e scala i tuoi risultati nel dating online
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`glass-card p-8 text-center pricing-card transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Più Popolare
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-left">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'btn-hero' : 'btn-outline'}`}
              >
                {plan.name === 'Free' ? 'Inizia Gratis' : 'Inizia Prova'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Tutti i piani includono garanzia soddisfatti o rimborsati di 30 giorni
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;