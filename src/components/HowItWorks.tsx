import { Upload, Brain, Copy } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Carica Screenshot",
    description: "Carica foto profilo o screenshot chat",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Analizza", 
    description: "La nostra AI studia il contesto e la persona",
    step: "02"
  },
  {
    icon: Copy,
    title: "Copia & Incolla",
    description: "Ricevi frasi d'apertura personalizzate", 
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Come <span className="gradient-text">Funziona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trasforma i tuoi match in conversazioni coinvolgenti con soli 3 semplici passi
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300 relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 glass-card w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold gradient-text">{step.step}</span>
                </div>
                
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                
                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary opacity-30"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;