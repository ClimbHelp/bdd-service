import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { loggingMiddleware } from "./middleware/logging.middleware";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Configuration CORS simplifiée et robuste
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Autoriser les requêtes sans origine (comme les apps mobiles, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Développement local
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:3006',
      'http://localhost:3010',
      
      // Staging Vercel
      'https://front-env-staging-climb-help.vercel.app',
      'https://autentication-service-git-develop-climb-help.vercel.app',
      'https://ai-service-git-develop-climb-help.vercel.app',
      'https://payment-service-git-develop-climb-help.vercel.app',
      'https://notifications-service-git-develop-climb-help.vercel.app',
      'https://monitoring-service-git-develop-climb-help.vercel.app',
      
      // Production Vercel
      'https://front-climb-help.vercel.app',
      'https://climb-help.vercel.app',
      'https://autentication-service-climb-help.vercel.app',
      'https://ai-service-climb-help.vercel.app',
      'https://payment-service-climb-help.vercel.app',
      'https://notifications-service-climb-help.vercel.app',
      'https://monitoring-service-climb-help.vercel.app',
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

// Middleware - CORS doit être en premier
app.use(cors(corsOptions));
app.use(helmet());
app.use(loggingMiddleware);
app.use(express.json());

// Gestion spécifique des requêtes OPTIONS (preflight)
app.options('*', cors(corsOptions));

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
