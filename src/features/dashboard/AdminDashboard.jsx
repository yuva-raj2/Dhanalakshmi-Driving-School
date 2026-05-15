import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, IndianRupee, CalendarCheck, TrendingUp, 
  Car, Clock, Award, AlertCircle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { KPIGrid } from './KPIGrid';
import { RevenueChart } from './RevenueChart';
import { AttendanceHeatmap } from './AttendanceHeatmap';

// Mock data for demo (replace with API calls)
const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  revenue: Math.floor(Math.random() * 5000) + 3000,
  students: Math.floor(Math.random() * 20) + 5,
}));

const mockPieData = [
  { name: 'Completed', value: 65, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#3B82F6' },
  { name: 'Pending', value: 10, color: '#F59E0B' },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Fetch dashboard data
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats', timeRange],
    queryFn: async () => {
      const response = await api.get(`/analytics/summary?range=${timeRange}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
  
  // KPI Cards Configuration
  const kpis = [
    { 
      label: 'Total Students', 
      value: stats?.totalStudents || '1,248', 
      icon: Users, 
      color: 'bg-accent-primary',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Revenue (MTD)', 
      value: stats?.revenue || '₹8.4L', 
      icon: IndianRupee, 
      color: 'bg-accent-success',
      trend: '+8.5%',
      trendUp: true
    },
    { 
      label: 'Active Sessions', 
      value: stats?.activeSessions || '84', 
      icon: CalendarCheck, 
      color: 'bg-accent-warning',
      trend: '-3%',
      trendUp: false
    },
    { 
      label: 'Success Rate', 
      value: stats?.successRate || '96.2%', 
      icon: Award, 
      color: 'bg-accent-purple',
      trend: '+2.1%',
      trendUp: true
    },
  ];
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card h-32 skeleton" />
          ))}
        </div>
        <div className="glass-card h-96 skeleton" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Dashboard</h1>
          <p className="text-text-secondary">Overview of your driving school performance</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`btn ${timeRange === range ? 'btn-primary' : 'btn-secondary'} text-sm`}
            >
              {range === '7d' ? 'Week' : range === '30d' ? 'Month' : 'Quarter'}
            </button>
          ))}
        </div>
      </div>
      
      {/* KPI Grid */}
      <KPIGrid cards={kpis} />
      
      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <RevenueChart data={mockChartData} />
        
        {/* Course Progress Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium mb-4">Course Completion</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {mockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#1E293B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#F8FAFC'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {mockPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-text-secondary">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Attendance Heatmap */}
      <AttendanceHeatmap />
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Student', icon: Users, action: () => {} },
            { label: 'Mark Attendance', icon: CalendarCheck, action: () => {} },
            { label: 'View Payments', icon: IndianRupee, action: () => {} },
            { label: 'Generate Report', icon: TrendingUp, action: () => {} },
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-bg-card hover:bg-surface-hover transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                <action.icon className="w-6 h-6 text-accent-primary" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}