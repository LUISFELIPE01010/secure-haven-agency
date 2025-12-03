import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OptimizedImage from '@/components/OptimizedImage';
import workersSafety from '@/assets/workers-safety.jpg';
import { HeartPulse, DollarSign, UserX, Activity, ShieldCheck, Stethoscope, CheckCircle2 } from 'lucide-react';
const WorkersCompensation = () => {
  const {
    t
  } = useTranslation();
  const [selectedCoverage, setSelectedCoverage] = useState<string | null>(null);
  const coverageCards = [{
    icon: Stethoscope,
    key: 'medical'
  }, {
    icon: DollarSign,
    key: 'wages'
  }, {
    icon: UserX,
    key: 'disability'
  }, {
    icon: Activity,
    key: 'rehab'
  }, {
    icon: ShieldCheck,
    key: 'employer'
  }, {
    icon: HeartPulse,
    key: 'illness'
  }];
  const benefitKeys = ['comply', 'protect', 'prevent', 'flexible'];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 lg:pt-40 md:pb-20 lg:pb-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <OptimizedImage 
            src="/lovable-uploads/06becffa-bfab-43cd-9eba-6c6188be8f6a.png"
            alt="Workers Safety" 
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 md:mb-6">
              {t('workersComp.hero.title')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('workersComp.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-4xl mx-auto">
            <img src={workersSafety} alt="Workers Safety" className="rounded-2xl shadow-2xl w-full h-auto hover-lift" />
          </motion.div>
        </div>
      </section>

      {/* Coverage Cards */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('workersComp.coverage.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {coverageCards.map((card, index) => {
            const Icon = card.icon;
            return <motion.div key={card.key} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }}>
                  <Card className="h-full hover-lift border-border bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => setSelectedCoverage(card.key)}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                        <Icon className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {t(`workersComp.coverage.${card.key}`)}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center">
              {t('workersComp.benefits.title')}
            </h2>
            <ul className="space-y-4">
              {benefitKeys.map((benefit, index) => <motion.li key={benefit} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t(`workersComp.benefits.${benefit}`)}</span>
                </motion.li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              {t('workersComp.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="hover-lift">
                <Link to="/contact">{t('workersComp.cta.quote')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift">
                <a href="tel:732-578-8877">{t('workersComp.cta.speak')}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Details Dialog */}
      <Dialog open={!!selectedCoverage} onOpenChange={() => setSelectedCoverage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedCoverage && t(`workersComp.coverage.${selectedCoverage}`)}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedCoverage && t(`workersComp.details.${selectedCoverage}`)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>;
};
export default WorkersCompensation;