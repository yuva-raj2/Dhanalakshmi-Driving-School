import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function KPIGrid({ cards = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="stat-card group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-text-secondary">{card.label}</p>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
              
              {/* Trend indicator */}
              {card.trend && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  card.trendUp ? 'text-accent-success' : 'text-accent-danger'
                }`}>
                  {card.trendUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{card.trend}</span>
                  <span className="text-text-muted">vs last period</span>
                </div>
              )}
            </div>
            
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Progress bar (optional) */}
          {card.progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Progress</span>
                <span>{card.progress}%</span>
              </div>
              <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full ${card.color}`}
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default KPIGrid;