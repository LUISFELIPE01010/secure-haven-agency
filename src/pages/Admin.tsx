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
import { LogOut, Mail, Phone, MessageSquare, Calendar, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

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
  const { t } = useTranslation();
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
          title: t('admin.accessDenied') || 'Access Denied',
          description: t('admin.noPermission') || 'You do not have admin permission.',
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

  const handleDeleteQuote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('quote_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Quote submission deleted successfully.',
      });
      
      await loadSubmissions();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete quote submission.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Contact submission deleted successfully.',
      });
      
      await loadSubmissions();
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete contact submission.',
        variant: 'destructive',
      });
    }
  };

  const handleExportToExcel = () => {
    try {
      // Prepare quotes data
      const quotesData = quoteSubmissions.map(q => ({
        'First Name': q.first_name,
        'Last Name': q.last_name,
        'Email': q.email,
        'Phone': q.phone,
        'Help Type': q.help_type || '-',
        'Language': q.language,
        'Date': formatDate(q.created_at)
      }));

      // Prepare contacts data
      const contactsData = contactSubmissions.map(c => ({
        'First Name': c.first_name,
        'Last Name': c.last_name,
        'Email': c.email,
        'Phone': c.phone,
        'Message': c.message,
        'Date': formatDate(c.created_at)
      }));

      // Create workbook with two sheets
      const wb = XLSX.utils.book_new();
      const wsQuotes = XLSX.utils.json_to_sheet(quotesData);
      const wsContacts = XLSX.utils.json_to_sheet(contactsData);

      XLSX.utils.book_append_sheet(wb, wsQuotes, 'Quote Submissions');
      XLSX.utils.book_append_sheet(wb, wsContacts, 'Contact Submissions');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `ng-family-shield-submissions-${date}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);

      toast({
        title: 'Success',
        description: 'Data exported successfully.',
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Error',
        description: 'Failed to export data.',
        variant: 'destructive',
      });
    }
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t('admin.title') || 'Admin Panel'}
              </h1>
              <p className="text-muted-foreground">
                {t('admin.subtitle') || 'Manage form submissions'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportToExcel} variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                {t('admin.logout') || 'Logout'}
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t('admin.filterByPeriod') || 'Filter by period'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.all') || 'All'}</SelectItem>
                <SelectItem value="today">{t('admin.today') || 'Today'}</SelectItem>
                <SelectItem value="week">{t('admin.thisWeek') || 'This Week'}</SelectItem>
                <SelectItem value="month">{t('admin.thisMonth') || 'This Month'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="quotes">
                {t('admin.quotes') || 'Quotes'} ({filteredQuotes.length})
              </TabsTrigger>
              <TabsTrigger value="contacts">
                {t('admin.contacts') || 'Contacts'} ({filteredContacts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="mt-6">
              <div className="grid gap-4">
                {filteredQuotes.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {t('admin.noQuotes') || 'No quotes found for this period.'}
                    </CardContent>
                  </Card>
                ) : (
                  filteredQuotes.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span>
                            {submission.first_name} {submission.last_name}
                          </span>
                          <span className="text-sm font-normal text-muted-foreground">
                            ({submission.language.toUpperCase()})
                          </span>
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuote(submission.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                      {t('admin.noContacts') || 'No contacts found for this period.'}
                    </CardContent>
                  </Card>
                ) : (
                  filteredContacts.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-lg">
                          {submission.first_name} {submission.last_name}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContact(submission.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
