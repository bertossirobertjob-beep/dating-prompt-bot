import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Plus, MessageCircle, Calendar } from 'lucide-react';

interface Profile {
  id: string;
  trial_start_date: string;
  trial_end_date: string;
}

interface Chat {
  id: string;
  title: string;
  conversation_type: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchChats();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (data) {
      setProfile(data);
      const trialEnd = new Date(data.trial_end_date);
      const today = new Date();
      const diffTime = trialEnd.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, diffDays));
    }
  };

  const fetchChats = async () => {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setChats(data);
    }
  };

  const handleCreateChat = () => {
    navigate('/create-chat');
  };

  const handleOpenChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Caricamento...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Benvenuto nel tuo assistente AI per appuntamenti</p>
      </header>

      {/* Trial Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Periodo di Prova
          </CardTitle>
          <CardDescription>
            Il tuo periodo di prova gratuito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">{daysLeft} giorni rimanenti</p>
              <p className="text-sm text-muted-foreground">
                Scade il {profile ? new Date(profile.trial_end_date).toLocaleDateString('it-IT') : ''}
              </p>
            </div>
            <Badge variant={daysLeft > 3 ? "default" : "destructive"}>
              {daysLeft > 0 ? 'Attivo' : 'Scaduto'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Create New Chat */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Inizia una Nuova Conversazione</CardTitle>
          <CardDescription>
            Crea una nuova chat per gestire i tuoi appuntamenti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCreateChat} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nuova Chat
          </Button>
        </CardContent>
      </Card>

      {/* Recent Chats */}
      <Card>
        <CardHeader>
          <CardTitle>Le Tue Chat Recenti</CardTitle>
          <CardDescription>
            Continua le conversazioni precedenti
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chats.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Non hai ancora creato nessuna chat. Inizia creando la tua prima conversazione!
            </p>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => handleOpenChat(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <div>
                      <h3 className="font-medium">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.conversation_type === 'first_message' ? 'Primo messaggio' : 'Conversazione in corso'} • 
                        {new Date(chat.created_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {chat.conversation_type === 'first_message' ? 'Primo contatto' : 'In corso'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;