import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to dashboard
        if (session?.user && event !== 'SIGNED_OUT') {
          console.log('Redirecting to dashboard...');
          navigate("/dashboard");
        }
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/dashboard");
      }
    };
    
    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Errore nella registrazione",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user && data.session) {
        console.log('Signup successful:', data.user.id);
        toast({
          title: "Registrazione completata!",
          description: "Benvenuto nella piattaforma",
        });
        
        // Force immediate redirect
        setTimeout(() => {
          console.log('Forcing redirect to dashboard');
          navigate('/dashboard');
        }, 500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Errore nella registrazione",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Errore nel login",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.session) {
      toast({
        title: "Login effettuato!",
        description: "Benvenuto nella piattaforma",
      });
      
      // Reindirizzo esplicito dopo login
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Approcciala.com
          </h1>
          <p className="text-muted-foreground">
            Inizia la tua prova gratuita
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Benvenuto</CardTitle>
            <CardDescription>
              Crea il tuo account o accedi per continuare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Registrati</TabsTrigger>
                <TabsTrigger value="signin">Accedi</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="la-tua-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Crea una password sicura"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full btn-hero" 
                    disabled={loading}
                  >
                    {loading ? "Registrazione..." : "Registrati"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input
                      id="email-signin"
                      type="email"
                      placeholder="la-tua-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signin">Password</Label>
                    <Input
                      id="password-signin"
                      type="password"
                      placeholder="La tua password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full btn-hero" 
                    disabled={loading}
                  >
                    {loading ? "Accesso..." : "Accedi"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;