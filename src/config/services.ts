// Configuration des URLs des services selon l'environnement
export const getServiceUrls = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaging = process.env.NODE_ENV === 'staging';
  
  if (isProduction) {
    return {
      notificationsService: 'https://notifications-service-climb-help.vercel.app',
      frontendUrl: 'https://front-climb-help.vercel.app'
    };
  }
  
  if (isStaging) {
    return {
      notificationsService: 'https://notifications-service-git-develop-climb-help.vercel.app',
      frontendUrl: 'https://front-env-staging-climb-help.vercel.app'
    };
  }
  
  // Développement local
  return {
    notificationsService: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3005',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  };
};
