// Razorpay SDK wrapper with error handling

export const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      reject(new Error('Failed to load payment gateway'));
    };
    
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (orderData) => {
  try {
    const response = await fetch('/api/v1/payments/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await fetch('/api/v1/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Razorpay verification error:', error);
    throw error;
  }
};

export const openRazorpayCheckout = (options) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }
    
    const rzp = new window.Razorpay({
      ...options,
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'));
        },
        ...options.modal,
      },
    });
    
    rzp.open();
  });
};

export default {
  loadRazorpay,
  createRazorpayOrder,
  verifyRazorpayPayment,
  openRazorpayCheckout,
};