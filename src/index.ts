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

// Middleware CORS manuel - DOIT être en premier
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  // Vérifier si l'origine est autorisée
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  // Headers CORS
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400'); // 24 heures
  
  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

const corsOptions = {
  origin: allowedOrigins,
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
