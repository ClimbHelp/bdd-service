# Tests Unitaires - Service BDD

Ce document décrit la structure et l'utilisation des tests unitaires pour le service BDD.

## Structure des Tests

```
src/__tests__/
├── setup.ts                          # Configuration globale des tests
├── mocks/
│   └── supabase.mock.ts              # Mocks pour Supabase
├── services/
│   └── supabase.service.test.ts      # Tests du service Supabase
├── controllers/
│   ├── user.controller.test.ts       # Tests du contrôleur utilisateur
│   └── salle.controller.test.ts      # Tests du contrôleur salle
├── middleware/
│   └── logging.middleware.test.ts    # Tests du middleware de logging
├── config/
│   └── supabase.test.ts              # Tests de la configuration Supabase
└── integration/
    └── api.test.ts                   # Tests d'intégration API
```

## Configuration

### Jest Configuration
Le fichier `jest.config.js` configure Jest pour :
- Utiliser TypeScript avec `ts-jest`
- Tester dans l'environnement Node.js
- Collecter la couverture de code
- Utiliser les mocks globaux
- Timeout de 10 secondes
- Mapping des modules avec `moduleNameMapper`

### Setup Global
Le fichier `src/__tests__/setup.ts` configure :
- Variables d'environnement de test par défaut
- Mocks globaux (fetch)
- Configuration des timeouts
- Variables d'environnement Supabase pour les tests

## Types de Tests

### 1. Tests Unitaires des Services
- **Fichier** : `services/supabase.service.test.ts`
- **Objectif** : Tester les opérations CRUD du service Supabase
- **Couverture** : Create, Read, Update, Delete pour toutes les entités

### 2. Tests Unitaires des Contrôleurs
- **Fichiers** : `controllers/*.test.ts`
- **Objectif** : Tester la logique métier des contrôleurs
- **Couverture** : Validation, gestion d'erreurs, réponses HTTP

### 3. Tests des Middlewares
- **Fichier** : `middleware/logging.middleware.test.ts`
- **Objectif** : Tester le middleware de logging
- **Couverture** : Logging des requêtes/réponses, gestion d'erreurs

### 4. Tests de Configuration
- **Fichier** : `config/supabase.test.ts`
- **Objectif** : Tester la configuration Supabase
- **Couverture** : Variables d'environnement, gestion d'erreurs

### 5. Tests d'Intégration
- **Fichier** : `integration/api.test.ts`
- **Objectif** : Tester les endpoints API complets
- **Couverture** : Flux complets, réponses HTTP, validation

## Mocks

### Supabase Mock
Le fichier `mocks/supabase.mock.ts` fournit :
- Mock du client Supabase
- Mock des services (userService, salleService)
- Données de test pour toutes les entités
- Configuration des réponses simulées

### Données de Test
```typescript
export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  password_hash: 'hashedpassword',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  premium: false
};
```

## Commandes de Test

### Exécuter tous les tests
```bash
npm test
```

### Exécuter les tests en mode watch
```bash
npm run test:watch
```

### Exécuter les tests avec couverture
```bash
npm run test:coverage
```

### Exécuter un fichier de test spécifique
```bash
npm test -- user.controller.test.ts
```

### Exécuter les tests d'intégration uniquement
```bash
npm test -- integration
```

## Couverture de Code

La configuration Jest collecte automatiquement la couverture de code :
- **Format** : HTML, LCOV, texte
- **Dossier** : `coverage/`
- **Exclusions** : Scripts de seed, fichiers de configuration

### Générer un rapport de couverture
```bash
npm run test:coverage
```

Le rapport sera disponible dans `coverage/index.html`

## Bonnes Pratiques

### 1. Structure des Tests
- Utiliser `describe` pour grouper les tests logiquement
- Utiliser `it` pour décrire le comportement attendu
- Utiliser `beforeEach` pour la configuration commune

### 2. Naming
- Nommer les tests de manière descriptive
- Utiliser le format "should [comportement attendu]"
- Grouper les tests par fonctionnalité

### 3. Mocks
- Mocker les dépendances externes (Supabase, services)
- Utiliser des données de test cohérentes
- Réinitialiser les mocks entre les tests

### 4. Assertions
- Tester les cas de succès et d'erreur
- Vérifier les appels aux services mockés
- Tester les codes de statut HTTP

## Exemple de Test

```typescript
describe('UserController', () => {
  describe('getAllUsers', () => {
    it('should return all users successfully', async () => {
      const users = [mockUser, { ...mockUser, id: 2 }];
      (userService.getAll as jest.Mock).mockResolvedValue(users);

      await UserController.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(userService.getAll).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ success: true, data: users });
    });

    it('should handle error when fetching users fails', async () => {
      const error = new Error('Database error');
      (userService.getAll as jest.Mock).mockRejectedValue(error);

      await UserController.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ 
        success: false, 
        error: 'Failed to fetch users' 
      });
    });
  });
});
```

## Débogage des Tests

### Mode Debug
```bash
npm test -- --verbose
```

### Tests en Mode Watch
```bash
npm run test:watch
```

### Logs Détaillés
```bash
npm test -- --verbose --detectOpenHandles
```

## Intégration CI/CD

Les tests sont automatiquement exécutés dans le pipeline CI/CD :
- Vérification de la syntaxe TypeScript
- Exécution des tests unitaires
- Génération du rapport de couverture
- Validation des seuils de couverture

## Maintenance

### Ajouter de Nouveaux Tests
1. Créer le fichier de test dans le bon dossier
2. Importer les mocks nécessaires
3. Suivre la structure existante
4. Ajouter les tests pour les cas de succès et d'erreur

### Mettre à Jour les Mocks
1. Modifier `mocks/supabase.mock.ts`
2. Mettre à jour les données de test
3. Vérifier la cohérence avec les interfaces

### Ajouter de Nouvelles Entités
1. Ajouter les mocks dans `supabase.mock.ts`
2. Créer les tests du service
3. Créer les tests du contrôleur
4. Ajouter les tests d'intégration
