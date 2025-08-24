import { Request, Response, NextFunction } from 'express';
import { loggingMiddleware } from '../../middleware/logging.middleware';

// Mock du service de logging
jest.mock('../../services/log.service', () => ({
  LogService: {
    insertHttpLogAsync: jest.fn()
  }
}));

describe('LoggingMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockRequest = {
      method: 'GET',
      url: '/api/users',
      ip: '127.0.0.1',
      headers: {
        'user-agent': 'Mozilla/5.0 (Test Browser)'
      }
    };
    
    mockResponse = {
      statusCode: 200,
      on: jest.fn()
    };
    
    mockNext = jest.fn();
  });

  it('should be defined', () => {
    expect(loggingMiddleware).toBeDefined();
  });

  it('should call next function', () => {
    const mockOn = mockResponse.on as jest.Mock;
    mockOn.mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    });

    loggingMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
