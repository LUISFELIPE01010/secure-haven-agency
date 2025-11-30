import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import heroFamilyImage from '@/assets/hero-family.jpg';
import autoHome from '@/assets/auto-home.jpg';
import rentersCondo from '@/assets/renters-condo.jpg';
import {
  Car,
  Home as HomeIcon,
  Key,
  Building2,
  Umbrella,
  Heart,
  Droplets,
  Bike,
  Caravan,
} from 'lucide-react';

const PersonalInsurance = () => {
  const { t } = useTranslation();
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  const insuranceOptions = [
    { icon: Car, key: 'auto' },
    { icon: HomeIcon, key: 'home' },
    { icon: Key, key: 'renters' },
    { icon: Building2, key: 'condo' },
    { icon: Umbrella, key: 'umbrella' },
    { icon: Heart, key: 'life' },
    { icon: Droplets, key: 'flood' },
    { icon: Bike, key: 'motorcycle' },
    { icon: Caravan, key: 'rv' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={heroFamilyImage} 
            alt="Happy family" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('personalInsurance.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('personalInsurance.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={autoHome} 
                alt="Auto and Home Insurance" 
                className="rounded-2xl shadow-xl w-full h-auto hover-lift"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={rentersCondo} 
                alt="Renters and Condo Insurance" 
                className="rounded-2xl shadow-xl w-full h-auto hover-lift"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Options */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('personalInsurance.options.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {insuranceOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover-lift border-border bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedInsurance(option.key)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                        <Icon className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {t(`personalInsurance.options.${option.key}`)}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('personalInsurance.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="hover-lift">
                <Link to="/contact">{t('personalInsurance.cta.quote')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift">
                <a href="tel:617-625-1900">{t('personalInsurance.cta.speak')}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Details Dialog */}
      <Dialog open={!!selectedInsurance} onOpenChange={() => setSelectedInsurance(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedInsurance && t(`personalInsurance.options.${selectedInsurance}`)}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedInsurance && t(`personalInsurance.details.${selectedInsurance}`)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalInsurance;
