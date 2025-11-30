import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuoteForm from '@/components/QuoteForm';
import ContactForm from '@/components/ContactForm';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import familyProtection from '@/assets/family-protection.jpg';
import howItWorks from '@/assets/how-it-works.jpg';
import {
  Car,
  Home as HomeIcon,
  Key,
  Building2,
  Shield,
  Users,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Car, key: 'auto', link: '/personal-insurance' },
    { icon: HomeIcon, key: 'home', link: '/personal-insurance' },
    { icon: Key, key: 'renters', link: '/personal-insurance' },
    { icon: Building2, key: 'condo', link: '/personal-insurance' },
    { icon: Building2, key: 'commercial', link: '/business-insurance' },
    { icon: Shield, key: 'liability', link: '/business-insurance' },
    { icon: Users, key: 'workers', link: '/workers-compensation' },
  ];

  const benefits = [
    'multilingual',
    'comparison',
    'simple',
    'support',
    'focused',
  ];

  const steps = ['step1', 'step2', 'step3', 'step4'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                {t('hero.headline')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('hero.subheadline')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link to="/contact">{t('hero.cta')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:617-625-1900">Call 617-625-1900</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {t('hero.languages')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={service.link}>
                    <Card className="h-full hover-lift cursor-pointer group border-border bg-card hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                          <Icon className="h-6 w-6 text-secondary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">
                          {t(`services.${service.key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t(`services.${service.key}.description`)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img 
                src={familyProtection} 
                alt="Family Protection" 
                className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('whyChoose.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('whyChoose.intro')}
              </p>
              <h3 className="font-semibold text-xl mb-4 text-foreground">
                {t('whyChoose.benefits.title')}
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      {t(`whyChoose.benefits.${benefit}`)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('aboutPreview.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('aboutPreview.text')}
            </p>
          <Button asChild size="lg" variant="outline">
            <Link to="/about">{t('aboutPreview.learnMore')}</Link>
          </Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsCarousel />

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('howItWorks.title')}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-lift">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {t(`howItWorks.${step}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-first lg:order-last"
            >
              <img 
                src={howItWorks} 
                alt="How It Works" 
                className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {t('finalCta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <a href="tel:617-625-1900">{t('finalCta.callNow')}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="https://wa.me/16176251900" target="_blank" rel="noopener noreferrer">
                  {t('finalCta.whatsapp')}
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">{t('finalCta.quote')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted/50 rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Are you ready?
              </h2>
              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-secondary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">ETAPA 1</h3>
                    <p className="text-muted-foreground">Preencha o formulário.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-secondary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">ETAPA 2</h3>
                    <p className="text-muted-foreground">Revise suas opções conosco.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-secondary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">ETAPA 3</h3>
                    <p className="text-muted-foreground">Obtenha a cobertura de que precisa.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
