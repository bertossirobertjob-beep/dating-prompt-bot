import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold gradient-text">FlirtAI</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Trasforma i tuoi match in appuntamenti reali con il potere dell'intelligenza artificiale.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Prodotto</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Come Funziona</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Prezzi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrazioni</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Supporto</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contatti</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Centro Aiuto</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Guida Utente</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legale</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/20">
          <div className="text-muted-foreground mb-4 md:mb-0">
            © 2024 FlirtAI. Tutti i diritti riservati.
          </div>
          
          {/* Social links */}
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a5.83 5.83 0 0 1-3.77-4.25V2h-3.45v13.67a3.47 3.47 0 0 1-3.47 3.47 3.47 3.47 0 0 1-3.47-3.47 3.47 3.47 0 0 1 3.47-3.47.68.68 0 0 1 .16 0v-3.5a7 7 0 0 0-.16 0 7 7 0 1 0 7 7V9.4a9.93 9.93 0 0 0 4.09 1.29v-3.6z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;