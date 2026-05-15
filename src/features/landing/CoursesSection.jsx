import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users,AwardIcon, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../../shared/components/CourseCard';

const courses = [
  {
    id: 'lmv',
    title: 'Light Motor Vehicle (LMV)',
    description: 'Learn to drive cars, jeeps, and small commercial vehicles with confidence.',
    duration: '4 weeks',
    students: '1,200+',
    price: '₹12,000',
    features: ['Basic Controls', 'City Driving', 'Parking', 'Traffic Rules', 'RTO Test Prep'],
    image: '/images/car-course.jpg',
    popular: false,
  },
  {
    id: 'hmv',
    title: 'Heavy Motor Vehicle (HMV)',
    description: 'Master heavy trucks, trailers, and commercial vehicles for professional driving.',
    duration: '8 weeks',
    students: '850+',
    price: '₹25,000',
    features: ['Heavy Vehicle Controls', 'Load Management', 'Long Distance', 'Safety Protocols', 'License Assistance'],
    image: '/images/truck-course.jpg',
    popular: true,
  },
  {
    id: 'bus',
    title: 'Bus & Passenger Transport',
    description: 'Specialized training for bus drivers with passenger safety focus.',
    duration: '6 weeks',
    students: '450+',
    price: '₹20,000',
    features: ['Passenger Safety', 'Route Planning', 'Emergency Procedures', 'Defensive Driving', 'First Aid Basics'],
    image: '/images/bus-course.jpg',
    popular: false,
  },
];

export function CoursesSection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Certified Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Choose Your <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Industry-approved curriculum designed for heavy vehicle professionals
          </p>
        </motion.div>
        
        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard
                {...course}
                onEnroll={() => navigate(`/register?course=${course.id}`)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            Not sure which course is right for you?
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-outline inline-flex items-center gap-2"
          >
            Talk to an Advisor
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
        
        {/* Course Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: Clock, title: 'Flexible Timing', desc: 'Morning, evening & weekend batches available' },
            { icon: Users, title: 'Small Batches', desc: 'Maximum 3 students per instructor for personalized attention' },
            { icon: AwardIcon, title: '100% Placement', desc: 'Assistance with job placement after course completion' },
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 glass-card">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CoursesSection;