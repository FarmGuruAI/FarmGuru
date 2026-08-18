import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Globe, ExternalLink, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-soil-dark border-t border-soil-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Sprout className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <span className="text-white font-bold text-xl tracking-tight">
                SoilSense <span className="text-primary-500">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered soil analysis for smarter agriculture.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/analysis" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Analysis</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Soil Analysis</li>
              <li className="text-gray-400 text-sm">NPK Testing</li>
              <li className="text-gray-400 text-sm">Health Score</li>
              <li className="text-gray-400 text-sm">Recommendations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">contact@soilsense.ai</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-soil-border/50">
          <p className="text-center text-gray-500 text-sm">
            © 2026 SoilSense AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
