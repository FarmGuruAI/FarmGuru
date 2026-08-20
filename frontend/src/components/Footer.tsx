import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Globe, ExternalLink, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Sprout className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
              <span className="text-foreground font-bold text-xl tracking-tight">
                Farm <span className="text-primary">Guru</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered soil analysis for smarter agriculture.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/analysis" className="text-muted-foreground hover:text-primary text-sm transition-colors">Analysis</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">Soil Analysis</li>
              <li className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">NPK Testing</li>
              <li className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">Health Score</li>
              <li className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">Recommendations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">harishvattikulla@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">+91 93372 23874</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">CUTM Paralakhemundi, Odisha</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left text-muted-foreground text-sm">
            © 2026 Farm Guru. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
