import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const QuoteForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    helpType: '',
    language: 'en',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('quote_submissions')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          help_type: formData.helpType,
          language: formData.language,
        }]);

      if (error) throw error;

      toast({
        title: t('form.successTitle') || 'Success!',
        description: t('form.successMessage') || 'We will contact you soon.',
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        helpType: '',
        language: 'en',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was an error submitting your form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-foreground">
        {t('form.title')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-foreground">
              {t('form.firstName')} *
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="mt-1.5 bg-background border-input"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" className="text-foreground">
              {t('form.lastName')} *
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="mt-1.5 bg-background border-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-foreground">
              {t('form.email')} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1.5 bg-background border-input"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-foreground">
              {t('form.phone')} *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-1.5 bg-background border-input"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground mb-2 block">
            {t('form.helpQuestion')}
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="quote"
                checked={formData.helpType === 'quote'}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, helpType: checked ? 'quote' : '' })
                }
              />
              <Label htmlFor="quote" className="text-sm font-normal cursor-pointer">
                {t('form.requestQuote')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="policy"
                checked={formData.helpType === 'policy'}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, helpType: checked ? 'policy' : '' })
                }
              />
              <Label htmlFor="policy" className="text-sm font-normal cursor-pointer">
                {t('form.helpPolicy')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="question"
                checked={formData.helpType === 'question'}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, helpType: checked ? 'question' : '' })
                }
              />
              <Label htmlFor="question" className="text-sm font-normal cursor-pointer">
                {t('form.question')}
              </Label>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="language" className="text-foreground">
            {t('form.language')} *
          </Label>
          <Select
            value={formData.language}
            onValueChange={(value) => setFormData({ ...formData, language: value })}
          >
            <SelectTrigger className="mt-1.5 bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, consent: checked as boolean })
            }
            required
          />
          <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed">
            <span className="font-medium">{t('form.consent')}.</span>{' '}
            {t('form.consentText')}
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-medium"
        >
          {isSubmitting ? t('form.submitting') || 'Submitting...' : t('form.submit')}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-2">
          {t('form.callToAction')}
        </p>
        <p className="text-sm font-medium text-foreground">
          {t('form.callInfo')}
        </p>
      </div>
    </div>
  );
};

export default QuoteForm;
