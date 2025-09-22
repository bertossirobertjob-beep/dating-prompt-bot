import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Come funziona l'AI?",
    answer: "La nostra AI utilizza algoritmi avanzati di machine learning per analizzare profili, foto e contesto delle conversazioni. Studia patterns di successo da migliaia di conversazioni per generare messaggi personalizzati che aumentano drasticamente le tue possibilità di ricevere una risposta."
  },
  {
    question: "È sicuro caricare le foto?",
    answer: "Assolutamente sì. Tutte le immagini vengono elaborate localmente e crittografate con standard di sicurezza bancari (AES-256). Non salviamo mai le tue foto sui nostri server e vengono eliminate automaticamente dopo l'analisi. La tua privacy è la nostra priorità assoluta."
  },
  {
    question: "Posso cancellare in qualsiasi momento?",
    answer: "Certo! Puoi cancellare la tua sottoscrizione in qualsiasi momento dal tuo dashboard utente. Non ci sono penali o costi nascosti. Se cancelli, continuerai ad avere accesso fino alla fine del periodo già pagato."
  },
  {
    question: "Su quali app funziona?",
    answer: "FlirtAI funziona con tutte le principali app di dating: Tinder, Bumble, Hinge, Badoo, Meetic, Once e molte altre. La nostra AI si adatta automaticamente allo stile e al formato di ogni piattaforma per massimizzare l'efficacia."
  },
  {
    question: "Quanto sono efficaci i messaggi generati?",
    answer: "I nostri utenti riportano un aumento medio del 300% nel tasso di risposta. La nostra AI analizza migliaia di conversazioni di successo per creare messaggi che catturano davvero l'attenzione e generano interesse genuino."
  },
  {
    question: "Posso personalizzare lo stile dei messaggi?",
    answer: "Assolutamente! Con i piani Pro ed Expert puoi impostare il tuo stile preferito: casual, formale, divertente, romantico, o diretto. L'AI adatterà tutti i messaggi al tuo tone of voice personale per mantenere l'autenticità."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Domande <span className="gradient-text">Frequenti</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tutto quello che devi sapere su FlirtAI
          </p>
        </div>
        
        <div className="glass-card p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border/20"
              >
                <AccordionTrigger className="text-left hover:text-primary text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Non trovi la risposta che cerchi?
          </p>
          <Button className="btn-outline">
            Contatta il Supporto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;