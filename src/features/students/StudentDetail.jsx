import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Edit, Calendar, Car, Award, FileText, Phone, Mail, MapPin } from 'lucide-react';
import api from '../../lib/axios';
import { formatCurrency, formatDate, formatPhone, formatPercent, formatDuration } from '../../core/utils/formatters';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const response = await api.get(`/students/${id}`);
      return response.data;
    },
  });
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-bg-tertiary rounded-lg skeleton w-48" />
        <div className="glass-card p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-bg-tertiary skeleton" />
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-bg-tertiary rounded skeleton w-48" />
              <div className="h-4 bg-bg-tertiary rounded skeleton w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!student) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-text-secondary">Student not found</p>
        <button onClick={() => navigate('/students')} className="btn-primary mt-4">
          Back to Students
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/students')}
          className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-display">{student.name}</h1>
          <p className="text-text-secondary">Registration: {student.registrationNo}</p>
        </div>
        <button
          onClick={() => navigate(`/students/${id}/edit`)}
          className="btn-secondary"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-accent-primary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-accent-primary">
                {student.name?.charAt(0) || '?'}
              </span>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="font-medium">{student.email}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="font-medium">{formatPhone(student.phone)}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </p>
                <p className="font-medium">{student.address}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Enrolled
                </p>
                <p className="font-medium">{formatDate(student.enrollmentDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attendance', value: formatPercent(student.attendancePercent), icon: Calendar, color: 'bg-accent-success' },
          { label: 'Progress', value: formatPercent(student.courseProgress), icon: Award, color: 'bg-accent-primary' },
          { label: 'Practice Hours', value: formatDuration(student.practiceHours), icon: Car, color: 'bg-accent-warning' },
          { label: 'Fees Paid', value: formatCurrency(student.feesPaid || 0), icon: FileText, color: 'bg-accent-purple' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 text-center"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Course & Vehicle Info */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-primary" />
            Course Progress
          </h3>
          
          <div className="space-y-4">
            {student.modules?.map((module) => (
              <div key={module.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{module.name}</span>
                  <span className="text-sm text-text-muted">{module.score}%</span>
                </div>
                <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      module.score === 100 ? 'bg-accent-success' : 'bg-accent-primary'
                    }`}
                    style={{ width: `${module.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Assigned Vehicle */}
        {student.assignedVehicle && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-accent-primary" />
              Assigned Vehicle
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-bg-tertiary flex items-center justify-center">
                <Car className="w-8 h-8 text-text-muted" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{student.assignedVehicle.model}</p>
                <p className="text-sm text-text-muted">
                  Reg: {student.assignedVehicle.regNumber}
                </p>
                <p className="text-sm text-text-muted">
                  Type: {student.assignedVehicle.type}
                </p>
              </div>
              <span className="badge badge-success">Available</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Attendance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent-primary" />
          Recent Attendance
        </h3>
        
        <div className="space-y-3">
          {student.attendance?.slice(0, 5).map((record) => (
            <div key={record.date} className="flex items-center justify-between p-3 bg-bg-card rounded-lg">
              <div>
                <p className="font-medium">{formatDate(record.date)}</p>
                <p className="text-sm text-text-muted">{record.hours} hours • {record.instructor}</p>
              </div>
              <span className={`badge ${
                record.status === 'PRESENT' ? 'badge-success' : 'badge-danger'
              }`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}