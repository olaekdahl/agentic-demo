const request = require('supertest');
const app = require('../server');

// Mock database connection to avoid real database during tests
jest.mock('../models', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue()
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

describe('Health Check', () => {
  test('GET /health should return 200 and status OK', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('API Routes', () => {
  test('GET / should return API information in development', async () => {
    process.env.NODE_ENV = 'development';
    
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Weather App API Server');
  });

  test('GET /api/auth/me should return 401 when not authenticated', async () => {
    await request(app)
      .get('/api/auth/me')
      .expect(401);
  });

  test('GET /api/weather/current/london should return 401 when not authenticated', async () => {
    await request(app)
      .get('/api/weather/current/london')
      .expect(401);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/nonexistent')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Route not found');
  });
});