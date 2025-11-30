import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactOptions = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly for immediate assistance',
      action: 'tel:617-625-1900',
      label: '617-625-1900',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Message us on WhatsApp for quick responses',
      action: 'https://wa.me/16176251900',
      label: 'Chat on WhatsApp',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond promptly',
      action: 'mailto:info@ngfamilyshield.com',
      label: 'info@ngfamilyshield.com',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              We are Here to Help You With All Your Insurance Needs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Getting in touch with us is quick and easy. You can call, text, email, or message us anytime. No pressure, no complications. Just friendly and helpful support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift border-border bg-card hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-xl mb-2 text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {option.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                      >
                        <a href={option.action} target={option.action.startsWith('http') ? '_blank' : undefined} rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          {option.label}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
