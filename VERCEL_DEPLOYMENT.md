# Déploiement du Service BDD sur Vercel

Ce document explique comment déployer le service BDD sur Vercel.

## Prérequis

1. Avoir un compte Vercel
2. Avoir installé Vercel CLI : `npm i -g vercel`
3. Avoir configuré les variables d'environnement Supabase

## Variables d'environnement requises

Dans votre projet Vercel, configurez les variables d'environnement suivantes :

```bash
# Supabase
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_clé_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role_supabase

# Base de données PostgreSQL (si utilisée directement)
DATABASE_URL=votre_url_postgresql

# Configuration du serveur
PORT=3000
NODE_ENV=production
```

## Déploiement

### Option 1 : Via Vercel CLI

1. Connectez-vous à Vercel :
```bash
vercel login
```

2. Déployez le projet :
```bash
cd bdd-service
vercel
```

3. Pour les déploiements suivants :
```bash
vercel --prod
```

### Option 2 : Via GitHub (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repository à Vercel
3. Vercel déploiera automatiquement à chaque push

## Structure des fichiers

- `vercel.json` : Configuration Vercel
- `.vercelignore` : Fichiers à ignorer lors du déploiement
- `dist/index.js` : Point d'entrée de l'application (généré par `npm run build`)

## Scripts disponibles

- `npm run build` : Compile TypeScript vers JavaScript
- `npm run vercel-build` : Script spécifique pour Vercel
- `npm start` : Démarre l'application en production

## Points d'API

Une fois déployé, votre API sera accessible via :
- `https://votre-projet.vercel.app/api/*`
- `https://votre-projet.vercel.app/health` (endpoint de santé)

## Limitations Vercel

- **Timeout** : 30 secondes maximum par requête
- **Mémoire** : Limite de mémoire pour les fonctions serverless
- **Connexions DB** : Gérer les connexions de base de données correctement

## Optimisations recommandées

1. Utiliser des connexions de base de données poolées
2. Implémenter du caching pour les requêtes fréquentes
3. Optimiser les requêtes de base de données
4. Utiliser des middlewares de compression

## Monitoring

- Surveillez les logs dans le dashboard Vercel
- Configurez des alertes pour les erreurs
- Surveillez les performances via Vercel Analytics
