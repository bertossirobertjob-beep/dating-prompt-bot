import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Errore durante il logout");
    } else {
      toast.success("Logout effettuato con successo");
      navigate("/");
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold gradient-text">Approcciala.com</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" onClick={handleDashboard}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleLogin}>
              Accedi
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;