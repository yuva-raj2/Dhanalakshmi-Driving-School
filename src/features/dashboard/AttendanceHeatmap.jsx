import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

// Generate mock attendance data
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 50) + 10,
      day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      dayNum: date.getDate(),
    });
  }
  
  return data;
};

export function AttendanceHeatmap({ data: propData }) {
  const data = useMemo(() => propData || generateHeatmapData(), [propData]);
  
  // Color scale for attendance count
  const getColor = (count) => {
    if (count === 0) return 'bg-bg-tertiary';
    if (count < 20) return 'bg-accent-primary/30';
    if (count < 40) return 'bg-accent-primary/60';
    return 'bg-accent-primary';
  };
  
  // Group data by week
  const weeks = useMemo(() => {
    const result = [];
    let week = [];
    
    data.forEach((item, index) => {
      week.push(item);
      if (week.length === 7 || index === data.length - 1) {
        result.push(week);
        week = [];
      }
    });
    
    return result;
  }, [data]);
  
  // Stats
  const totalSessions = data.reduce((sum, d) => sum + d.count, 0);
  const avgPerDay = Math.round(totalSessions / data.length);
  const busiestDay = data.reduce((max, d) => d.count > max.count ? d : max, data[0]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-accent-primary" />
          <h3 className="text-lg font-medium">Attendance Overview</h3>
        </div>
        <span className="text-sm text-text-muted">Last 30 days</span>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-bg-card rounded-lg">
          <p className="text-2xl font-bold">{totalSessions}</p>
          <p className="text-xs text-text-muted">Total Sessions</p>
        </div>
        <div className="text-center p-3 bg-bg-card rounded-lg">
          <p className="text-2xl font-bold">{avgPerDay}</p>
          <p className="text-xs text-text-muted">Avg/Day</p>
        </div>
        <div className="text-center p-3 bg-bg-card rounded-lg">
          <p className="text-2xl font-bold">{busiestDay?.dayNum}</p>
          <p className="text-xs text-text-muted">Busiest Day</p>
        </div>
      </div>
      
      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max pb-2">
          {/* Day labels */}
          <div className="flex flex-col justify-between py-1 pr-2 text-xs text-text-muted">
            {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((day, i) => (
              <span key={i} className={day ? '' : 'invisible'}>{day}</span>
            ))}
          </div>
          
          {/* Weeks */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
                  className={`w-4 h-4 rounded-sm ${getColor(day.count)} cursor-pointer hover:ring-2 hover:ring-accent-primary transition-all`}
                  title={`${day.date}: ${day.count} sessions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-text-muted">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-bg-tertiary" />
          <div className="w-3 h-3 rounded-sm bg-accent-primary/30" />
          <div className="w-3 h-3 rounded-sm bg-accent-primary/60" />
          <div className="w-3 h-3 rounded-sm bg-accent-primary" />
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}

export default AttendanceHeatmap;