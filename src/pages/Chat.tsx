import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ImageUpload';

interface Chat {
  id: string;
  title: string;
  conversation_type: string;
  created_at: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  images?: string[];
}

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingChat, setLoadingChat] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (chatId && user) {
      fetchChat();
      fetchMessages();
    }
  }, [chatId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChat = async () => {
    if (!chatId) return;
    
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('id', chatId)
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error('Error fetching chat:', error);
      toast({
        title: "Errore",
        description: "Chat non trovata",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }

    setChat(data);
    setLoadingChat(false);
  };

  const fetchMessages = async () => {
    if (!chatId) return;

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        message_images(image_url)
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (data) {
      const typedMessages = data.map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant',
        images: msg.message_images?.map((img: any) => img.image_url) || []
      }));
      setMessages(typedMessages);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && uploadedImages.length === 0) return;
    if (!chatId || !user) return;

    setSending(true);

    try {
      // Crea il messaggio dell'utente
      let messageContent = newMessage.trim();
      
      // Se ci sono immagini, aggiungi riferimenti al contenuto
      if (uploadedImages.length > 0) {
        messageContent += `\n\nImmagini allegate: ${uploadedImages.length}`;
      }

      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            content: messageContent,
            role: 'user',
          }
        ])
        .select()
        .single();

      if (messageError) throw messageError;

      // Salva le immagini associate al messaggio
      if (uploadedImages.length > 0) {
        const imagePromises = uploadedImages.map((imageUrl, index) => {
          return supabase
            .from('message_images')
            .insert([
              {
                message_id: messageData.id,
                image_url: imageUrl,
                image_name: `image_${index + 1}.jpg`,
              }
            ]);
        });

        await Promise.all(imagePromises);
      }

      // Aggiorna la lista dei messaggi
      const typedMessage = {
        ...messageData,
        role: 'user' as const
      };
      setMessages(prev => [...prev, typedMessage]);

      // Reset form
      setNewMessage('');
      setUploadedImages([]);

      // Simula una risposta dell'assistente (per ora)
      setTimeout(async () => {
        const assistantMessage = {
          chat_id: chatId,
          content: `Grazie per il tuo messaggio! ${chat?.conversation_type === 'first_message' ? 'Questo è il primo contatto, procederò con cautela.' : 'Continuo la nostra conversazione.'}`,
          role: 'assistant' as const,
        };

        const { data: assistantData, error: assistantError } = await supabase
          .from('messages')
          .insert([assistantMessage])
          .select()
          .single();

        if (!assistantError && assistantData) {
          const typedAssistantMessage = {
            ...assistantData,
            role: 'assistant' as const
          };
          setMessages(prev => [...prev, typedAssistantMessage]);
        }
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Errore",
        description: "Impossibile inviare il messaggio",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading || loadingChat) {
    return <div className="flex items-center justify-center min-h-screen">Caricamento...</div>;
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chat non trovata</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Torna alla Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{chat.title}</h1>
              <Badge variant="outline">
                {chat.conversation_type === 'first_message' ? 'Primo contatto' : 'Conversazione in corso'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                Nessun messaggio ancora. Inizia la conversazione!
              </div>
              {chat.conversation_type === 'first_message' && (
                <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                  💡 <strong>Suggerimento:</strong> Questo è un primo contatto. Sii educato e professionale nel tuo approccio.
                </div>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {message.role === 'user' ? 'Tu' : 'Assistente AI'}
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date(message.created_at).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Visualizza le immagini del messaggio */}
                  {message.images && message.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {message.images.map((imageUrl, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={imageUrl}
                          alt={`Immagine ${imgIndex + 1}`}
                          className="rounded-md max-w-full h-auto cursor-pointer hover:opacity-80"
                          onClick={() => window.open(imageUrl, '_blank')}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4">
              <ImageUpload
                onImagesUploaded={setUploadedImages}
                maxImages={10}
                images={uploadedImages}
              />
              
              {uploadedImages.length > 0 && <Separator className="my-4" />}
              
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi il tuo messaggio..."
                  disabled={sending}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={sending || (!newMessage.trim() && uploadedImages.length === 0)}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                Premi Invio per inviare • Shift + Invio per andare a capo
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;