import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogOut, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  help_type: string | null;
  language: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [quoteSubmissions, setQuoteSubmissions] = useState<QuoteSubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>('all');

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data: adminRole } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (!adminRole) {
        toast({
          title: 'Acesso negado',
          description: 'Você não tem permissão de admin.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await loadSubmissions();
    } catch (error) {
      console.error('Error checking admin:', error);
      navigate('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubmissions = async () => {
    try {
      const { data: quotes } = await supabase
        .from('quote_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      setQuoteSubmissions(quotes || []);
      setContactSubmissions(contacts || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const filterByTime = (submissions: any[]) => {
    const now = new Date();
    
    return submissions.filter(submission => {
      const submissionDate = new Date(submission.created_at);
      
      switch (timeFilter) {
        case 'today':
          return submissionDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return submissionDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return submissionDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const filteredQuotes = filterByTime(quoteSubmissions);
  const filteredContacts = filterByTime(contactSubmissions);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Painel Admin
              </h1>
              <p className="text-muted-foreground">
                Gerencie as submissões dos formulários
              </p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <div className="mb-6">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="quotes">
                Cotações ({filteredQuotes.length})
              </TabsTrigger>
              <TabsTrigger value="contacts">
                Contatos ({filteredContacts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="mt-6">
              <div className="grid gap-4">
                {filteredQuotes.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      Nenhuma cotação encontrada para este período.
                    </CardContent>
                  </Card>
                ) : (
                  filteredQuotes.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span>
                            {submission.first_name} {submission.last_name}
                          </span>
                          <span className="text-sm font-normal text-muted-foreground">
                            ({submission.language.toUpperCase()})
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${submission.email}`} className="hover:underline">
                            {submission.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${submission.phone}`} className="hover:underline">
                            {submission.phone}
                          </a>
                        </div>
                        {submission.help_type && (
                          <div className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="capitalize">{submission.help_type}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(submission.created_at)}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="mt-6">
              <div className="grid gap-4">
                {filteredContacts.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      Nenhum contato encontrado para este período.
                    </CardContent>
                  </Card>
                ) : (
                  filteredContacts.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {submission.first_name} {submission.last_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${submission.email}`} className="hover:underline">
                            {submission.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${submission.phone}`} className="hover:underline">
                            {submission.phone}
                          </a>
                        </div>
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(submission.created_at)}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
