import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Truck Driver',
    location: 'Chennai',
    image: '/images/testimonials/student1.jpg',
    rating: 5,
    text: 'Dhanalakshmi changed my life! The instructors were patient and the practical training on real trucks gave me the confidence to handle heavy vehicles professionally. Got my license in first attempt!',
    course: 'HMV Course',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Bus Driver',
    location: 'Bangalore',
    image: '/images/testimonials/student2.jpg',
    rating: 5,
    text: 'As a woman entering the commercial driving field, I was nervous. But the supportive environment and female-friendly facilities made all the difference. Highly recommend!',
    course: 'Bus Transport Course',
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    role: 'Transport Business Owner',
    location: 'Hyderabad',
    image: '/images/testimonials/student3.jpg',
    rating: 5,
    text: 'I sent 5 of my employees for training. All of them passed their license tests and are now skilled drivers. The corporate training program is excellent value for money.',
    course: 'Corporate Training',
  },
  {
    id: 4,
    name: 'Suresh Reddy',
    role: 'Fresh Graduate',
    location: 'Coimbatore',
    image: '/images/testimonials/student4.jpg',
    rating: 5,
    text: 'The job placement assistance was a game-changer. Not only did I learn to drive heavy vehicles, but I also got placed with a reputed transport company within a week of completing the course.',
    course: 'HMV + Placement',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-success/10 text-accent-success text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Student Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real experiences from drivers who transformed their careers with us
          </p>
        </motion.div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="testimonial-card"
            >
              <Quote className="w-12 h-12 text-accent-primary/20 mb-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-warning fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-lg text-text-primary mb-6 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent-primary/20"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentIndex].name}&background=3B82F6&color=fff`;
                  }}
                />
                <div>
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-text-muted">{testimonials[currentIndex].role}</p>
                  <p className="text-xs text-text-muted">{testimonials[currentIndex].location}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="badge badge-info">{testimonials[currentIndex].course}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-surface-hover transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-surface-hover transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-accent-primary w-6' 
                  : 'bg-border-primary hover:bg-accent-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border-primary"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-primary">4.9/5</p>
            <p className="text-sm text-text-muted">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-primary">2,500+</p>
            <p className="text-sm text-text-muted">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-primary">98%</p>
            <p className="text-sm text-text-muted">Would Recommend</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;