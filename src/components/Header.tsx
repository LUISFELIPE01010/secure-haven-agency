import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';
import logo from '@/assets/logo.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    t,
    i18n
  } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const languages = [{
    code: 'en',
    flag: '🇺🇸',
    name: 'EN'
  }, {
    code: 'pt',
    flag: '🇧🇷',
    name: 'PT'
  }, {
    code: 'es',
    flag: '🇪🇸',
    name: 'ES'
  }];
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="NG Family Shield" className="h-20 w-auto transition-transform duration-300 group-hover:scale-90" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              {t('nav.home')}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                {t('nav.services')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-border">
                <DropdownMenuItem asChild>
                  <Link to="/personal-insurance" className="cursor-pointer">
                    {t('nav.personal')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/business-insurance" className="cursor-pointer">
                    {t('nav.business')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/workers-compensation" className="cursor-pointer">
                    {t('nav.workersComp')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              {t('nav.about')}
            </Link>

            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* CTA & Language Selector */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {currentLanguage.flag} {currentLanguage.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                {languages.map(lang => <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)} className="cursor-pointer">
                    {lang.flag} {lang.name}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover-lift transition-all duration-300">
              <Link to="/contact">{t('hero.cta')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                {languages.map(lang => <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)} className="cursor-pointer">
                    {lang.flag} {lang.name}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.home')}
              </Link>
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                {t('nav.services')}
              </div>
              <Link to="/personal-insurance" onClick={() => setIsMenuOpen(false)} className="px-8 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.personal')}
              </Link>
              <Link to="/business-insurance" onClick={() => setIsMenuOpen(false)} className="px-8 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.business')}
              </Link>
              <Link to="/workers-compensation" onClick={() => setIsMenuOpen(false)} className="px-8 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.workersComp')}
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                {t('nav.contact')}
              </Link>
              <div className="px-4 pt-2">
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover-lift transition-all duration-300">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t('hero.cta')}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;