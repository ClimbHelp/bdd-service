import { Request, Response } from 'express';
import { SalleController } from '../../controllers/salle.controller';

// Mock simple des services
jest.mock('../../services/supabase.service', () => ({
  userService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  salleService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

jest.mock('../../services/log.service');

describe('SalleController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };
    
    mockResponse = {
      json: mockJson,
      status: mockStatus
    };
  });

  it('should be defined', () => {
    expect(SalleController).toBeDefined();
  });

  it('should have all required methods', () => {
    expect(typeof SalleController.getAllSalles).toBe('function');
    expect(typeof SalleController.getSalleById).toBe('function');
    expect(typeof SalleController.createSalle).toBe('function');
    expect(typeof SalleController.updateSalle).toBe('function');
    expect(typeof SalleController.deleteSalle).toBe('function');
  });
});
