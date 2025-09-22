import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco",
    age: "28",
    text: "Ho triplicato i miei match in una settimana! Le frasi generate sono perfette e sembrano davvero naturali.",
    rating: 5,
    avatar: "M"
  },
  {
    name: "Luca", 
    age: "24",
    text: "Finalmente so cosa scrivere senza sembrare strano. L'AI capisce perfettamente il contesto e la personalità.",
    rating: 5,
    avatar: "L"
  },
  {
    name: "Andrea",
    age: "31", 
    text: "Le risposte sono perfette, sembro più interessante e ho molte più conversazioni che si trasformano in appuntamenti.",
    rating: 5,
    avatar: "A"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Cosa Dicono i Nostri <span className="gradient-text">Utenti</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Migliaia di persone hanno già trasformato la loro vita amorosa
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card space-y-6"
            >
              {/* Rating stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <blockquote className="text-lg leading-relaxed text-center">
                "{testimonial.text}"
              </blockquote>
              
              {/* User info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.age} anni</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-muted-foreground">Match Generati</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">92%</div>
            <div className="text-muted-foreground">Tasso di Risposta</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5</div>
            <div className="text-muted-foreground">Valutazione Media</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;