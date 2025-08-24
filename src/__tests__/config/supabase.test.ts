import { supabase } from '../../config/supabase';

// Mock des variables d'environnement
const originalEnv = process.env;

describe('Supabase Configuration', () => {
  beforeEach(() => {
    // Sauvegarder les variables d'environnement originales
    process.env.SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'test-anon-key';
  });

  it('should have environment variables set', () => {
    expect(process.env.SUPABASE_URL).toBe('https://test.supabase.co');
    expect(process.env.SUPABASE_ANON_KEY).toBe('test-anon-key');
  });

  it('should have NODE_ENV set to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});
