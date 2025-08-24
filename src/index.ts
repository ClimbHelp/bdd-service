import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
// import { loggingMiddleware } from "./middleware/logging.middleware"; // DÉSACTIVÉ TEMPORAIREMENT
import routes from "./routes";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Configuration CORS simple et robuste
app.use(cors({
  origin: true, // Autoriser toutes les origines pour le moment
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Middleware
app.use(helmet());
// app.use(loggingMiddleware); // DÉSACTIVÉ TEMPORAIREMENT
app.use(express.json());

// Route de test simple
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", service: "bdd-service", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api", routes);

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Export pour Vercel serverless
module.exports = app;

// Démarrage du serveur seulement en développement
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
