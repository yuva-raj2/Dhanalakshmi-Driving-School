import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP } from '../../core/utils/constants';

export function CTASection() {
  const navigate = useNavigate();
  
  const openWhatsApp = () => {
    window.open(WHATSAPP.URL(WHATSAPP.NUMBER, WHATSAPP.MESSAGE), '_blank');
  };
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-purple/5" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Ready to Start Your <span className="text-gradient">Driving Career</span>?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto"
            >
              Join thousands of successful drivers. Get expert training, flexible schedules, 
              and guaranteed license assistance.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-lg px-8 py-4"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={openWhatsApp}
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-muted"
            >
              <a href="tel:+919443822462" className="flex items-center gap-2 hover:text-accent-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 9443822462
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Chennai, Tamil Nadu
              </div>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                Admissions Open
              </span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-8 text-sm text-text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />
            No Hidden Fees
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />
            Free Demo Class
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />
            EMI Available
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;