import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
const ReviewsCarousel = () => {
  const {
    t
  } = useTranslation();
  const reviews = [{
    id: 1,
    key: 'review1'
  }, {
    id: 2,
    key: 'review2'
  }, {
    id: 3,
    key: 'review3'
  }, {
    id: 4,
    key: 'review4'
  }, {
    id: 5,
    key: 'review5'
  }];
  return <section className="py-20 bg-muted/30">
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
            {t('reviews.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('reviews.subtitle')}
          </p>
        </motion.div>

        <Carousel opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1
      }} plugins={[Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })]} className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map(review => <CarouselItem key={review.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4
            }} className="h-full">
                  <Card className="h-full hover-lift">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">
                        "{t(`reviews.${review.key}.text`)}"
                      </p>
                      <p className="font-semibold text-foreground">
                        {t(`reviews.${review.key}.name`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="https://www.google.com/search?q=NG+Family+Shield+Insurance" target="_blank" rel="noopener noreferrer">
              {t('reviews.button')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>;
};
export default ReviewsCarousel;