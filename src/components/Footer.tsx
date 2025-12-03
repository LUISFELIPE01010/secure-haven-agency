import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';
const Footer = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img alt="NG Family Shield" className="h-24 w-auto mb-4" src="/lovable-uploads/4c60acde-edbf-4e56-b0d8-44838fae2a09.png" />
            <p className="text-sm text-primary-foreground/80">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/personal-insurance" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.personal')}
                </Link>
              </li>
              <li>
                <Link to="/business-insurance" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.business')}
                </Link>
              </li>
              <li>
                <Link to="/workers-compensation" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.workersComp')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:732-578-8877" className="hover:text-primary-foreground transition-colors">
                  732-578-8877
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@ngfamilyshield.com" className="hover:text-primary-foreground transition-colors">
                  info@ngfamilyshield.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Instagram className="h-4 w-4" />
                <a href="https://www.instagram.com/ngfamilyshield/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  @ngfamilyshield
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} NG Family Shield Insurance Agency. {t('footer.rights')}
            </p>
            <Link to="/auth" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;