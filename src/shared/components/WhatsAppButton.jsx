import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919443822462';
  const message = encodeURIComponent('Hi, I\'m interested in joining Dhanalakshmi Heavy Driving School. Can you help me?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 btn-whatsapp rounded-full p-4 shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
    </motion.a>
  );
}