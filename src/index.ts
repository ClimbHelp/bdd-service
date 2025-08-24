import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { loggingMiddleware } from "./middleware/logging.middleware";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Configuration CORS
const corsOptions = {
  origin: [
    // Développement local
    'http://localhost:3000',  // Frontend
    'http://localhost:3001',  // Service d'authentification
    'http://localhost:3002',  // Service AI
    'http://localhost:3003',  // Service BDD (lui-même)
    'http://localhost:3004',  // Service AI
    'http://localhost:3005',  // Service de paiement
    'http://localhost:3006',  // Service de notifications
    'http://localhost:3010',  // Service de monitoring
    
    // Staging Vercel
    'https://front-env-staging-climb-help.vercel.app',  // Frontend staging
    'https://autentication-service-git-develop-climb-help.vercel.app',  // Auth staging
    'https://ai-service-git-develop-climb-help.vercel.app',  // AI staging
    'https://payment-service-git-develop-climb-help.vercel.app',  // Payment staging
    'https://notifications-service-git-develop-climb-help.vercel.app',  // Notifications staging
    'https://monitoring-service-git-develop-climb-help.vercel.app',  // Monitoring staging
    
    // Production Vercel
    'https://front-climb-help.vercel.app',  // Frontend production
    'https://climb-help.vercel.app',  // Frontend production alternative
    'https://autentication-service-climb-help.vercel.app',  // Auth production
    'https://ai-service-climb-help.vercel.app',  // AI production
    'https://payment-service-climb-help.vercel.app',  // Payment production
    'https://notifications-service-climb-help.vercel.app',  // Notifications production
    'https://monitoring-service-climb-help.vercel.app',  // Monitoring production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet()); // Sécurité
app.use(cors(corsOptions)); // Gestion des CORS avec configuration spécifique
app.use(loggingMiddleware); // Logging personnalisé avec Supabase
app.use(express.json()); // Parser JSON

// Routes
app.use("/api", routes);

// Route de test
app.get("/health", (req: Request, res: Response) => {
  return res.json({ status: "OK", service: "bdd-service" });
});

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Something went wrong!" });
});

// Export pour Vercel serverless
module.exports = app;

// Démarrage du serveur seulement en développement
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
