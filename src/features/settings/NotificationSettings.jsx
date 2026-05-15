import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageCircle, Smartphone, Save } from 'lucide-react';
import { useToast } from '../../shared/hooks/useToast';

const notificationTypes = [
  {
    id: 'course',
    title: 'Course Updates',
    description: 'Get notified about new modules, schedule changes, and course completion',
    icon: Bell,
  },
  {
    id: 'attendance',
    title: 'Attendance Alerts',
    description: 'Receive reminders for upcoming sessions and attendance confirmations',
    icon: Bell,
  },
  {
    id: 'payment',
    title: 'Payment Notifications',
    description: 'Get updates on payment status, due dates, and receipts',
    icon: Bell,
  },
  {
    id: 'promotional',
    title: 'Promotional Messages',
    description: 'Receive offers, discounts, and new course announcements',
    icon: Bell,
  },
];

const channels = [
  { id: 'email', label: 'Email', icon: Mail, description: 'Receive notifications via email' },
  { id: 'sms', label: 'SMS', icon: Smartphone, description: 'Get text message alerts' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, description: 'Receive updates on WhatsApp' },
  { id: 'push', label: 'Push', icon: Bell, description: 'Browser/app push notifications' },
];

export default function NotificationSettings() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    course: { email: true, sms: false, whatsapp: true, push: false },
    attendance: { email: true, sms: true, whatsapp: true, push: true },
    payment: { email: true, sms: true, whatsapp: false, push: true },
    promotional: { email: false, sms: false, whatsapp: false, push: false },
  });
  
  const togglePreference = (type, channel) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: !prev[type][channel]
      }
    }));
  };
  
  const handleSave = async () => {
    try {
      // In production, save to API
      toast({
        title: 'Settings Saved',
        description: 'Your notification preferences have been updated',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Please try again',
        variant: 'error'
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">Notification Settings</h1>
        <p className="text-text-secondary">Choose how you want to receive updates</p>
      </div>
      
      {/* Notification Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-6 border-b border-border-primary">
          <h3 className="font-medium">Notification Types</h3>
          <p className="text-sm text-text-muted">Select which updates you want to receive</p>
        </div>
        
        <div className="divide-y divide-border-primary">
          {notificationTypes.map((type) => (
            <div key={type.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <type.icon className="w-5 h-5 text-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{type.title}</h4>
                    {/* Master toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={Object.values(preferences[type.id]).some(v => v)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPreferences(prev => ({
                            ...prev,
                            [type.id]: {
                              email: checked,
                              sms: checked,
                              whatsapp: checked,
                              push: checked,
                            }
                          }));
                        }}
                      />
                      <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  <p className="text-sm text-text-muted mb-4">{type.description}</p>
                  
                  {/* Channel toggles */}
                  <div className="flex flex-wrap gap-4">
                    {channels.map((channel) => (
                      <label key={channel.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border-primary bg-bg-card text-accent-primary focus:ring-accent-primary/50"
                          checked={preferences[type.id][channel.id]}
                          onChange={() => togglePreference(type.id, channel.id)}
                        />
                        <channel.icon className="w-4 h-4 text-text-muted" />
                        <span className="text-sm">{channel.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="font-medium mb-4">Quick Settings</h3>
        <div className="space-y-4">
          {/* Do Not Disturb */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Do Not Disturb</p>
              <p className="text-sm text-text-muted">Pause all notifications temporarily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          
          {/* Quiet Hours */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quiet Hours</p>
              <p className="text-sm text-text-muted">No notifications between 10 PM - 7 AM</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          
          {/* Weekly Digest */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Digest</p>
              <p className="text-sm text-text-muted">Get a summary of your progress every Sunday</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end"
      >
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </motion.div>
    </div>
  );
}