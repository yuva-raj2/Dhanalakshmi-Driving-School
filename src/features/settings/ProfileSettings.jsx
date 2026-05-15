import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Camera, Save, User, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../core/providers/AuthProvider';
import { useToast } from '../../shared/hooks/useToast';
import { validateName, validateEmail, validatePhone } from '../../core/utils/validators';

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  
  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      licenseNumber: user?.licenseNumber || '',
    }
  });
  
  const onSubmit = async (data) => {
    try {
      // In production, call API to update profile
      updateUser(data);
      toast({
        title: 'Profile Updated',
        description: 'Your information has been saved successfully',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error?.message || 'Please try again',
        variant: 'error'
      });
    }
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">Profile Settings</h1>
        <p className="text-text-secondary">Manage your personal information</p>
      </div>
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border-primary">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-accent-primary/20 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-accent-primary" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center cursor-pointer hover:bg-accent-primaryHover transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div>
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-sm text-text-muted">{user?.role}</p>
            <p className="text-xs text-text-muted mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="input-label">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('fullName', {
                    required: 'Name is required',
                    validate: (v) => validateName(v)
                  })}
                  className={`input-field pl-12 ${errors.fullName ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="text-sm text-accent-danger">{errors.fullName.message}</p>}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="input-label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    validate: (v) => validateEmail(v)
                  })}
                  type="email"
                  className={`input-field pl-12 ${errors.email ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <label className="input-label">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  {...register('phone', {
                    required: 'Phone is required',
                    validate: (v) => validatePhone(v)
                  })}
                  type="tel"
                  className={`input-field pl-12 ${errors.phone ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                  placeholder="+91 9443822462"
                />
              </div>
              {errors.phone && <p className="text-sm text-accent-danger">{errors.phone.message}</p>}
            </div>
            
            {/* Address */}
            <div className="space-y-2">
              <label className="input-label">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 w-5 h-5 text-text-muted" />
                <textarea
                  {...register('address')}
                  className={`input-field pl-12 min-h-[80px] resize-none`}
                  placeholder="Enter your address"
                />
              </div>
            </div>
            
            {/* License Number */}
            <div className="space-y-2 md:col-span-2">
              <label className="input-label">License Number (Optional)</label>
              <input
                {...register('licenseNumber')}
                className="input-field"
                placeholder="TN0120240012345"
              />
              <p className="text-xs text-text-muted">Enter your learner's or permanent license number if available</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <button type="button" className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="btn-primary"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="font-medium mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border-primary">
            <div>
              <p className="text-sm text-text-muted">Member Since</p>
              <p className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '-'}</p>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border-primary">
            <div>
              <p className="text-sm text-text-muted">Account Type</p>
              <p className="font-medium capitalize">{user?.role?.toLowerCase() || 'Student'}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-text-muted">Last Login</p>
              <p className="font-medium">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString('en-IN') : 'First time'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}