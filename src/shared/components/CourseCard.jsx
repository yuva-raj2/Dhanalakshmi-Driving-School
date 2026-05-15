import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../core/utils/formatters';

export function CourseCard({
  title,
  description,
  duration,
  students,
  price,
  features = [],
  image,
  popular = false,
  onEnroll,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-card relative overflow-hidden group ${
        popular ? 'border-accent-primary ring-1 ring-accent-primary/20' : ''
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-4 right-4">
          <span className="badge badge-success">Most Popular</span>
        </div>
      )}
      
      {/* Image */}
      {image && (
        <div className="h-48 rounded-xl overflow-hidden mb-4 bg-bg-tertiary">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {students}
          </span>
        </div>
        
        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-accent-success flex-shrink-0" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
          {features.length > 3 && (
            <li className="text-sm text-accent-primary">
              +{features.length - 3} more features
            </li>
          )}
        </ul>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border-primary">
          <div>
            <span className="text-2xl font-bold">{formatCurrency(price)}</span>
            <span className="text-sm text-text-muted">/ course</span>
          </div>
          <button
            onClick={onEnroll}
            className="btn-primary flex items-center gap-1"
          >
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCard;