import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Car, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { useToast } from '../../shared/hooks/useToast';
import { validateName, validateEmail, validatePhone, validateRequired } from '../../core/utils/validators';

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  
  // Fetch student data if editing
  const { data: student, isLoading: loadingStudent } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const response = await api.get(`/students/${id}`);
      return response.data;
    },
    enabled: isEdit,
  });
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: student || {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      licenseType: 'LMV',
      licenseNumber: '',
      emergencyContact: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      fees: '',
      paymentStatus: 'PENDING',
      notes: '',
    }
  });
  
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await api.put(`/students/${id}`, data);
        toast({ title: 'Student Updated', description: 'Changes saved successfully', variant: 'success' });
      } else {
        await api.post('/students', data);
        toast({ title: 'Student Added', description: 'New student enrolled successfully', variant: 'success' });
      }
      navigate('/students');
    } catch (error) {
      toast({
        title: isEdit ? 'Update Failed' : 'Enrollment Failed',
        description: error?.message || 'Please try again',
        variant: 'error'
      });
    }
  };
  
  if (loadingStudent && isEdit) {
    return (
      <div className="glass-card p-8">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-14 bg-bg-tertiary rounded-lg skeleton" />
          ))}
        </div>
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
        <div>
          <h1 className="text-2xl font-bold font-display">
            {isEdit ? 'Edit Student' : 'Enroll New Student'}
          </h1>
          <p className="text-text-secondary">
            {isEdit ? 'Update student information' : 'Add a new student to the system'}
          </p>
        </div>
      </div>
      
      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Personal Information */}
        <div className="glass-card p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-accent-primary" />
            Personal Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="input-label">Full Name *</label>
              <input
                {...register('fullName', {
                  required: 'Name is required',
                  validate: (v) => validateName(v)
                })}
                className={`input-field ${errors.fullName ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-sm text-accent-danger">{errors.fullName.message}</p>}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="input-label">Email Address *</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (v) => validateEmail(v)
                })}
                type="email"
                className={`input-field ${errors.email ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <label className="input-label">Phone Number *</label>
              <input
                {...register('phone', {
                  required: 'Phone is required',
                  validate: (v) => validatePhone(v)
                })}
                type="tel"
                className={`input-field ${errors.phone ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="+91 9443822462"
              />
              {errors.phone && <p className="text-sm text-accent-danger">{errors.phone.message}</p>}
            </div>
            
            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="input-label">Date of Birth *</label>
              <input
                {...register('dob', { required: 'DOB is required' })}
                type="date"
                className={`input-field ${errors.dob ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
              />
              {errors.dob && <p className="text-sm text-accent-danger">{errors.dob.message}</p>}
            </div>
            
            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="input-label">Address *</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className={`input-field min-h-[80px] resize-none ${errors.address ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="Enter full address"
              />
              {errors.address && <p className="text-sm text-accent-danger">{errors.address.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Course Information */}
        <div className="glass-card p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-accent-primary" />
            Course Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* License Type */}
            <div className="space-y-2">
              <label className="input-label">License Type *</label>
              <select
                {...register('licenseType', { required: 'License type is required' })}
                className={`select-field ${errors.licenseType ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
              >
                <option value="LMV">Light Motor Vehicle (LMV)</option>
                <option value="HMV">Heavy Motor Vehicle (HMV)</option>
                <option value="TRUCK">Truck</option>
                <option value="BUS">Bus</option>
                <option value="TRACTOR">Tractor</option>
              </select>
              {errors.licenseType && <p className="text-sm text-accent-danger">{errors.licenseType.message}</p>}
            </div>
            
            {/* License Number */}
            <div className="space-y-2">
              <label className="input-label">Learner's License No.</label>
              <input
                {...register('licenseNumber')}
                className="input-field"
                placeholder="TN0120240012345"
              />
            </div>
            
            {/* Enrollment Date */}
            <div className="space-y-2">
              <label className="input-label">Enrollment Date *</label>
              <input
                {...register('enrollmentDate', { required: 'Enrollment date is required' })}
                type="date"
                className={`input-field ${errors.enrollmentDate ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
              />
              {errors.enrollmentDate && <p className="text-sm text-accent-danger">{errors.enrollmentDate.message}</p>}
            </div>
            
            {/* Fees */}
            <div className="space-y-2">
              <label className="input-label">Course Fees (₹) *</label>
              <input
                {...register('fees', {
                  required: 'Fees are required',
                  validate: (v) => !isNaN(v) || 'Enter a valid amount'
                })}
                type="number"
                min="0"
                className={`input-field ${errors.fees ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="15000"
              />
              {errors.fees && <p className="text-sm text-accent-danger">{errors.fees.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="glass-card p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-primary" />
            Additional Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Emergency Contact */}
            <div className="space-y-2">
              <label className="input-label">Emergency Contact *</label>
              <input
                {...register('emergencyContact', {
                  required: 'Emergency contact is required',
                  validate: (v) => validatePhone(v)
                })}
                type="tel"
                className={`input-field ${errors.emergencyContact ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="+91 9443822462"
              />
              {errors.emergencyContact && <p className="text-sm text-accent-danger">{errors.emergencyContact.message}</p>}
            </div>
            
            {/* Payment Status */}
            <div className="space-y-2">
              <label className="input-label">Payment Status</label>
              <select
                {...register('paymentStatus')}
                className="select-field"
              >
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="PARTIAL">Partial</option>
              </select>
            </div>
            
            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <label className="input-label">Notes</label>
              <textarea
                {...register('notes')}
                className="input-field min-h-[100px] resize-none"
                placeholder="Any additional information about the student..."
              />
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Student' : 'Enroll Student'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}