import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, CalendarCheck, Star } from 'lucide-react';
import { StatCounter } from '../../shared/components/StatCounter';

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Students Trained',
    description: 'Successfully certified drivers',
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'Pass Rate',
    description: 'License exam success rate',
  },
  {
    icon: CalendarCheck,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'In driving education',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Student Rating',
    description: 'Average satisfaction score',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 group"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join India's most reliable heavy vehicle driving school
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-accent-primary" />
              </div>
              
              <StatCounter
                end={stat.value}
                suffix={stat.suffix}
                className="text-3xl md:text-4xl font-bold mb-2"
              />
              
              <p className="font-medium mb-1">{stat.label}</p>
              <p className="text-sm text-text-muted">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-12 pt-8 border-t border-border-primary"
        >
          {['Government Certified', 'ISO 9001:2015', 'RTO Approved', 'Insurance Covered'].map((badge) => (
            <span key={badge} className="flex items-center gap-2 text-sm text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-success" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;