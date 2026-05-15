import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { CoursesSection } from './CoursesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { WhatsAppButton } from '../../shared/components/WhatsAppButton';
import { useScrollAnimation } from '../../core/hooks/useScrollAnimation';

export default function LandingPage() {
  useScrollAnimation();
  
  useEffect(() => {
    // Initialize any landing page specific logic
    document.title = 'Dhanalakshmi Heavy Driving School | Professional Driving Training';
  }, []);
  
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section with Three.js */}
      <HeroSection />
      
      {/* Stats Section - Inspired by Maruti Suzuki */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <StatsSection />
      </motion.section>
      
      {/* Courses Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 px-4 bg-bg-secondary/30"
      >
        <CoursesSection />
      </motion.section>
      
      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Why Choose <span className="text-gradient">Dhanalakshmi</span>?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-12">
            Professional training with expert instructors, modern vehicles, and a proven curriculum
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Expert Instructors', desc: 'Certified trainers with 10+ years experience' },
              { icon: '🚛', title: 'Modern Fleet', desc: 'Well-maintained heavy vehicles for practical training' },
              { icon: '📜', title: 'License Assistance', desc: 'Complete support for RTO license process' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}