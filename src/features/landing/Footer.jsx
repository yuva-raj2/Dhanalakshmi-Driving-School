import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, 
  ChevronRight, Shield, Award, Clock 
} from 'lucide-react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa'; 
import { WHATSAPP, APP } from '../../core/utils/constants';

const footerLinks = {
  courses: [
    { label: 'Light Motor Vehicle (LMV)', href: '/courses/lmv' },
    { label: 'Heavy Motor Vehicle (HMV)', href: '/courses/hmv' },
    { label: 'Bus & Transport', href: '/courses/bus' },
    { label: 'Tractor Training', href: '/courses/tractor' },
    { label: 'Corporate Training', href: '/corporate' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Instructors', href: '/instructors' },
    { label: 'Success Stories', href: '/testimonials' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  support: [
    { label: 'FAQs', href: '/faq' },
    { label: 'Admission Process', href: '/admission' },
    { label: 'Fee Structure', href: '/fees' },
    { label: 'License Process', href: '/license-guide' },
    { label: 'Safety Guidelines', href: '/safety' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};
const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-purple flex items-center justify-center">
                <span className="text-white font-bold">DH</span>
              </div>
              <span className="font-bold font-display text-lg">Dhanalakshmi DS</span>
            </Link>
            <p className="text-text-secondary text-sm mb-4 max-w-xs">
              India's premier heavy vehicle driving school. Certified training, expert instructors, guaranteed results.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href={`tel:+91${WHATSAPP.NUMBER.replace('+91', '')}`} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 9443822462
              </a>
              <a href={`mailto:${APP.SUPPORT_EMAIL}`} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {APP.SUPPORT_EMAIL}
              </a>
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123, Driving School Road, Chennai - 600001</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
  <a
    key={social.label}
    href={social.href}
    className="w-9 h-9 rounded-lg bg-bg-card flex items-center justify-center text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all"
    aria-label={social.label}
  >
    {/* ✅ react-icons components need size prop */}
    <social.icon className="w-4 h-4" size={16} />
  </a>
))}
            </div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-muted hover:text-accent-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border-primary"
        >
          <p className="text-sm text-text-muted text-center md:text-left">
            © {new Date().getFullYear()} {APP.NAME}. All rights reserved.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure Payments
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              Govt. Certified
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              24/7 Support
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;