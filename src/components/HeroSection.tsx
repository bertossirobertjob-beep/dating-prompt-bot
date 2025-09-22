import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroMockup from "@/assets/hero-chat-mockup.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6 fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Trasforma i tuoi{" "}
                <span className="text-white font-extrabold">match</span> in{" "}
                <span className="text-white font-extrabold">appuntamenti reali</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                La nuova intelligenza artificiale che ti dice esattamente cosa scrivere per ottenere appuntamenti garantiti
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start fade-in-up-delayed">
              <Button className="btn-hero text-lg">
                Prova Gratis
              </Button>
              
              <Button variant="outline" className="btn-outline text-lg group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Guarda Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground fade-in-up-delayed-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Nessuna carta richiesta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Setup in 2 minuti</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Chat mockup */}
          <div className="flex justify-center lg:justify-end fade-in-up-delayed">
            <div className="relative">
              <div className="glass-card p-8 max-w-md w-full">
                <img 
                  src={heroMockup} 
                  alt="Chat mockup showing AI-generated opening message"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 glass-card p-3 animate-pulse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 glass-card p-2">
                  <span className="text-xs font-semibold gradient-text">AI Generated ✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;