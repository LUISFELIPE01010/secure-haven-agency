import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import OptimizedImage from '@/components/OptimizedImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import businessHeroImage from '@/assets/business-hero.jpg';
import businessTeam from '@/assets/business-team.jpg';
import {
  Shield,
  Users,
  Car,
  Briefcase,
  FileText,
  Laptop,
} from 'lucide-react';

const BusinessInsurance = () => {
  const { t } = useTranslation();
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);

  const insuranceSpecialties = [
    'generalLiability',
    'professionalLiability',
    'businessInterruption',
    'cyberLiability',
    'liquorLiability',
    'lessorsRisk',
    'commercialVehicle',
    'workersComp',
    'multiFamilyHousing',
    'churchTemple',
    'contractors',
    'bop',
  ];

  const insuranceOptions = [
    { icon: Shield, key: 'generalLiability' },
    { icon: FileText, key: 'professionalLiability' },
    { icon: Users, key: 'workersComp' },
    { icon: Car, key: 'commercialVehicle' },
    { icon: Briefcase, key: 'bop' },
    { icon: Laptop, key: 'cyberLiability' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 lg:pt-40 md:pb-20 lg:pb-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src={businessHeroImage} 
            alt="Business professional" 
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 md:mb-6">
              {t('businessInsurance.hero.title')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('businessInsurance.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <OptimizedImage 
              src={businessTeam} 
              alt="Business Team" 
              className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
              wrapperClassName="rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Insurance Specialties List */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary mb-8">
              {t('businessInsurance.specialties.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {insuranceSpecialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-foreground rounded-full flex-shrink-0" />
                  <span className="text-foreground text-base">
                    {t(`businessInsurance.specialties.${specialty}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Options Cards */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('businessInsurance.options.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
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
                        {t(`businessInsurance.specialties.${option.key}`)}
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
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              {t('businessInsurance.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="hover-lift">
                <Link to="/contact">{t('businessInsurance.cta.quote')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift">
                <a href="tel:732-578-8877">{t('businessInsurance.cta.speak')}</a>
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
              {selectedInsurance && t(`businessInsurance.options.${selectedInsurance}`)}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedInsurance && t(`businessInsurance.details.${selectedInsurance}`)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessInsurance;
