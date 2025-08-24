import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { loggingMiddleware } from "./middleware/logging.middleware";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Configuration CORS manuelle - DOIT être en PREMIER
app.use((req: Request, res: Response, next: NextFunction) => {
  // Autoriser toutes les origines pour le moment (on peut restreindre plus tard)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, Referer, accept-language, priority, sec-fetch-dest, sec-fetch-mode, sec-fetch-site');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 heures
  
  // Gestion des requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

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
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
