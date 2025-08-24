import { SupabaseService } from '../../services/supabase.service';

// Mock simple du module supabase
jest.mock('../../config/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => ({
          data: { id: 1, name: 'test' },
          error: null
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { id: 1, name: 'test' },
            error: null
          }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { id: 1, name: 'updated' },
              error: null
            }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: { id: 1, name: 'test' },
          error: null
        }))
      }))
    }))
  }
}));

describe('SupabaseService', () => {
  let service: SupabaseService<any>;

  beforeEach(() => {
    service = new SupabaseService('test_table');
  });

  it('should create a new service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have all required methods', () => {
    expect(typeof service.create).toBe('function');
    expect(typeof service.getById).toBe('function');
    expect(typeof service.getAll).toBe('function');
    expect(typeof service.update).toBe('function');
    expect(typeof service.delete).toBe('function');
  });
});
