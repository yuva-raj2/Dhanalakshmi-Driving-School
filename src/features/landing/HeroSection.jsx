import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Shield, Users, Award } from 'lucide-react';
import { ThreeVehicle } from '../../shared/components/ThreeVehicle';
import { Spinner } from '../../shared/components/ui/Spinner';

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />
      }>
        <ThreeVehicle />
      </Suspense>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-transparent z-10" />
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-6"
          >
            <Shield className="w-4 h-4 text-accent-primary" />
            <span className="text-sm font-medium text-accent-primary">Certified Training Center</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6"
          >
            Master Heavy Vehicle Driving with{' '}
            <span className="text-gradient">Confidence & Safety</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed"
          >
            Professional driving training for trucks, buses, and heavy vehicles. 
            Learn from expert instructors with modern simulators and on-road practice.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button
              onClick={() => navigate('/register')}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Learning Today
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent-success" />
              <span>5,000+ Students Trained</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-warning" />
              <span>Government Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-primary" />
              <span>100% Safety Record</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-text-muted"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}