// Configuration des URLs des services selon l'environnement
export const getServiceUrls = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaging = process.env.NODE_ENV === 'staging';
  
  if (isProduction) {
    return {
      notificationsService: 'https://notification-service-u6b3.onrender.com',
      paymentService: 'https://payment-service-msup.onrender.com',
      frontendUrl: 'https://front-climb-help.vercel.app'
    };
  }
  
  if (isStaging) {
    return {
      notificationsService: 'https://notifications-service-git-develop-climb-help.vercel.app',
      paymentService: 'https://payment-service-msup.onrender.com',
      frontendUrl: 'https://front-env-staging-climb-help.vercel.app'
    };
  }
  
  // Développement local
  return {
    notificationsService: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3005',
    paymentService: process.env.PAYMENT_SERVICE_URL || 'https://payment-service-msup.onrender.com',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  };
};
