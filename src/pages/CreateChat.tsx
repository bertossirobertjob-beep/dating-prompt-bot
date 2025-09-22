import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, MessageCircle, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useToast } from '@/components/ui/use-toast';

const CreateChat = () => {
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [conversationType, setConversationType] = useState<'first_message' | 'ongoing_conversation'>('first_message');
  const [loading, setLoading] = useState(false);

  const handleCreateChat = async () => {
    if (!user || !title.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un titolo per la chat",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            user_id: user.id,
            title: title.trim(),
            conversation_type: conversationType,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Chat Creata",
        description: "La tua nuova chat è stata creata con successo",
      });

      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
      toast({
        title: "Errore",
        description: "Impossibile creare la chat. Riprova.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Torna alla Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Crea una Nuova Chat</CardTitle>
          <CardDescription>
            Configura la tua conversazione per gestire gli appuntamenti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo della Chat</Label>
            <Input
              id="title"
              placeholder="Es. Appuntamenti Gennaio 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Tipo di Conversazione</Label>
            <RadioGroup
              value={conversationType}
              onValueChange={(value) => setConversationType(value as 'first_message' | 'ongoing_conversation')}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="first_message" id="first_message" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="first_message" className="flex items-center gap-2 cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    Primo Messaggio
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Per iniziare una nuova conversazione con un contatto
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="ongoing_conversation" id="ongoing_conversation" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="ongoing_conversation" className="flex items-center gap-2 cursor-pointer">
                    <Users className="h-4 w-4" />
                    Conversazione in Corso
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Per continuare una conversazione esistente
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Annulla
            </Button>
            <Button
              onClick={handleCreateChat}
              disabled={loading || !title.trim()}
              className="flex-1"
            >
              {loading ? 'Creazione...' : 'Crea Chat'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateChat;