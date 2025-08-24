import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { loggingMiddleware } from "./middleware/logging.middleware";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// // Configuration CORS complète et robuste
// const allowedOrigins = [
//   // Développement local
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'http://localhost:3002',
//   'http://localhost:3003',
//   'http://localhost:3004',
//   'http://localhost:3005',
//   'http://localhost:3006',
//   'http://localhost:3010',
  
//   // Staging Vercel
//   'https://front-env-staging-climb-help.vercel.app',
//   'https://autentication-service-git-develop-climb-help.vercel.app',
//   'https://ai-service-git-develop-climb-help.vercel.app',
//   'https://payment-service-git-develop-climb-help.vercel.app',
//   'https://notifications-service-git-develop-climb-help.vercel.app',
//   'https://monitoring-service-git-develop-climb-help.vercel.app',
  
//   // Production Vercel
//   'https://front-climb-help.vercel.app',
//   'https://climb-help.vercel.app',
//   'https://autentication-service-climb-help.vercel.app',
//   'https://ai-service-climb-help.vercel.app',
//   'https://payment-service-climb-help.vercel.app',
//   'https://notifications-service-climb-help.vercel.app',
//   'https://monitoring-service-climb-help.vercel.app',
// ];

// // Middleware CORS manuel - DOIT être en premier
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const origin = req.headers.origin;
  
//   // Vérifier si l'origine est autorisée
//   if (origin && allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
  
//   // Headers CORS
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, Referer, accept-language, priority, sec-fetch-dest, sec-fetch-mode, sec-fetch-site');
//   res.header('Access-Control-Max-Age', '86400'); // 24 heures
  
//   // Gestion des requêtes OPTIONS (preflight)
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }
  
//   next();
// });

app.use(cors({
  origin: "https://front-env-staging-climb-help.vercel.app", // ton frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Middleware - Helmet APRÈS CORS pour éviter les conflits
app.use(helmet());
app.use(loggingMiddleware);
app.use(express.json());

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
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }
