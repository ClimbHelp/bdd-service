// Configuration globale pour les tests
beforeAll(() => {
  // Configuration globale avant tous les tests
  process.env.NODE_ENV = 'test';
  
  // Variables d'environnement de test par défaut
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_ANON_KEY = 'test-anon-key';
  process.env.SUPABASE_KEY = 'test-service-key';
});

afterAll(() => {
  // Nettoyage global après tous les tests
});

// Mock global pour fetch si nécessaire
global.fetch = jest.fn();

// Configuration des timeouts
jest.setTimeout(10000);

// Test simple pour éviter l'erreur "must contain at least one test"
describe('Setup', () => {
  it('should be configured', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});
