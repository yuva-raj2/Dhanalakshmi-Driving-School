import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, Award, Clock, FileText, IndianRupee } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { formatCurrency, formatDate, formatPercent, formatDuration } from '../../core/utils/formatters';
import { useAuth } from '../../core/providers/AuthProvider';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  // Fetch student data
  const { data: studentData, isLoading } = useQuery({
    queryKey: ['student-dashboard', user?.id],
    queryFn: async () => {
      const response = await api.get(`/students/${user?.id}`);
      return response.data;
    },
    enabled: !!user?.id,
  });
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card h-32 skeleton" />
          ))}
        </div>
        <div className="glass-card h-64 skeleton" />
      </div>
    );
  }
  
  const student = studentData || {};
  
  // KPI Cards
  const kpis = [
    { 
      label: 'Attendance', 
      value: formatPercent(student.attendancePercent || 85), 
      icon: Calendar, 
      color: 'bg-accent-success',
      subtext: `${student.classesAttended || 24}/${student.totalClasses || 30} classes`
    },
    { 
      label: 'Course Progress', 
      value: formatPercent(student.courseProgress || 65), 
      icon: Award, 
      color: 'bg-accent-primary',
      subtext: `${student.modulesCompleted || 4}/${student.totalModules || 6} modules`
    },
    { 
      label: 'Practice Hours', 
      value: formatDuration(student.practiceHours || 45.5), 
      icon: Clock, 
      color: 'bg-accent-warning',
      subtext: 'Target: 60 hours'
    },
    { 
      label: 'Payment Status', 
      value: student.paymentStatus === 'PAID' ? 'Paid' : 'Pending', 
      icon: IndianRupee, 
      color: student.paymentStatus === 'PAID' ? 'bg-accent-success' : 'bg-accent-warning',
      subtext: student.paymentStatus === 'PAID' ? 'All fees cleared' : '₹5,000 pending'
    },
  ];
  
  // Upcoming sessions
  const upcomingSessions = [
    { date: '2024-01-15', time: '10:00 AM', type: 'Highway Driving', instructor: 'Rajesh Kumar', vehicle: 'Tata Truck' },
    { date: '2024-01-17', time: '2:00 PM', type: 'Parking Practice', instructor: 'Suresh Reddy', vehicle: 'Ashok Leyland' },
    { date: '2024-01-19', time: '9:00 AM', type: 'Traffic Rules', instructor: 'Rajesh Kumar', vehicle: 'Theory Class' },
  ];
  
  // Performance modules
  const modules = [
    { name: 'Driving Basics', score: 92, status: 'Completed' },
    { name: 'Traffic Rules', score: 88, status: 'Completed' },
    { name: 'Parking & Maneuvering', score: 75, status: 'In Progress' },
    { name: 'Highway Driving', score: 0, status: 'Not Started' },
    { name: 'Night Driving', score: 0, status: 'Not Started' },
    { name: 'Emergency Handling', score: 0, status: 'Not Started' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Welcome, {student.name || 'Student'}! 👋</h1>
          <p className="text-text-secondary">Here's your learning progress</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline">
            <FileText className="w-4 h-4" />
            Download Certificate
          </button>
        </div>
      </div>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                <p className="text-xs text-text-muted mt-1">{kpi.subtext}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent-primary" />
            Upcoming Sessions
          </h3>
          
          <div className="space-y-3">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-bg-card rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-accent-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{session.type}</p>
                  <p className="text-sm text-text-muted">
                    {formatDate(session.date)} • {session.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{session.instructor}</p>
                  <p className="text-xs text-text-muted">{session.vehicle}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="btn-secondary w-full mt-4">
            View All Sessions
          </button>
        </motion.div>
        
        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-primary" />
            Module Progress
          </h3>
          
          <div className="space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{module.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    module.status === 'Completed' ? 'badge-success' :
                    module.status === 'In Progress' ? 'badge-info' : 'badge-muted'
                  }`}>
                    {module.status}
                  </span>
                </div>
                <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.score}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      module.score === 100 ? 'bg-accent-success' :
                      module.score > 0 ? 'bg-accent-primary' : 'bg-border-primary'
                    }`}
                  />
                </div>
                {module.score > 0 && (
                  <p className="text-xs text-text-muted">{module.score}% complete</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Assigned Vehicle */}
      {student.assignedVehicle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-accent-primary" />
            Assigned Vehicle
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-bg-tertiary flex items-center justify-center">
              <Car className="w-10 h-10 text-text-muted" />
            </div>
            <div>
              <p className="font-semibold">{student.assignedVehicle.model}</p>
              <p className="text-sm text-text-muted">
                Registration: {student.assignedVehicle.regNumber}
              </p>
              <p className="text-sm text-text-muted">
                Type: {student.assignedVehicle.type}
              </p>
            </div>
            <div className="ml-auto">
              <span className="badge-success">Available</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}