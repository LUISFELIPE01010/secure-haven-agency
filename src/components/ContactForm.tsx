import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          consent: formData.consent,
        }]);

      if (error) throw error;

      toast({
        title: t('contactForm.success.title'),
        description: t('contactForm.success.description'),
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contactForm.error.title'),
        description: t('contactForm.error.description'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
      <h3 className="text-2xl font-semibold mb-6 text-foreground">
        {t('contactForm.title')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-foreground">
              {t('contactForm.firstName')}
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="mt-1.5"
              placeholder={t('contactForm.firstNamePlaceholder')}
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" className="text-foreground">
              {t('contactForm.lastName')}
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="mt-1.5"
              placeholder={t('contactForm.lastNamePlaceholder')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-foreground">
              {t('contactForm.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1.5"
              placeholder={t('contactForm.emailPlaceholder')}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-foreground">
              {t('contactForm.phone')}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-1.5"
              placeholder={t('contactForm.phonePlaceholder')}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="text-foreground">
            {t('contactForm.message')}
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="mt-1.5 min-h-[120px]"
            placeholder={t('contactForm.messagePlaceholder')}
          />
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
            <span className="font-medium">{t('contactForm.legalNotice')}</span>{' '}
            {t('contactForm.consentText')}
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-medium"
        >
          {isSubmitting ? t('contactForm.sending') : t('contactForm.submit')}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        {t('contactForm.dontLikeForms')}{' '}
        <a href="tel:617-625-1900" className="text-foreground font-medium hover:underline">
          617-625-1900
        </a>{' '}
        {t('contactForm.or')}{' '}
        <a href="mailto:info@ngfamilyshield.com" className="text-foreground font-medium hover:underline">
          {t('contactForm.emailUs')}
        </a>
        .
      </div>
    </div>
  );
};

export default ContactForm;