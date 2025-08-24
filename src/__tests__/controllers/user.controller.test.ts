import { Request, Response } from 'express';

// Mock des modules avant les imports pour éviter les erreurs d'environnement
jest.mock('../../config/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

jest.mock('../../services/log.service', () => ({
  LogService: {
    insertHttpLogAsync: jest.fn()
  }
}));

import { UserController } from '../../controllers/user.controller';

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

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserController', () => {
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
    expect(UserController).toBeDefined();
  });

  it('should have all required methods', () => {
    expect(typeof UserController.getAllUsers).toBe('function');
    expect(typeof UserController.getUserById).toBe('function');
    expect(typeof UserController.createUser).toBe('function');
    expect(typeof UserController.updateUser).toBe('function');
    expect(typeof UserController.deleteUser).toBe('function');
  });
});
